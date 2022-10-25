/**
 * API TIB FINANCE SDK
 * 
 * NB : 
 * Il faut modifier la valeur de l'attribut serverURL par celle de Production 
 * si vous voulez mettre le SDK en PROD.
 * 
 */

class CryptoCaller{
  static serverURL = "";
  static sessionId = "";
  static serviceId;
  static clientId;
  static userName;
  static password;

    static initialize(serverURL) {
      CryptoCaller.serverURL = serverURL;
    }

    /**
     * Obtenir les clé public de serveur TIB FINANCE
     * 
     * @returns 
     */
    static getPublicKey() {
      let headers = new Headers();

      return $.ajax({
        url: CryptoCaller.serverURL + "/data/GetPublicKey",
        method: "POST",
      });
    }

    /**
     * Crypter une clé
     * @param {*} getPublicKeyResult 
     * @returns 
     */
    static cryptKeys(getPublicKeyResult) {
      var returnData,
        remotePublicRsaProvider,
        localPublicKeyXml,
        mergedPublicKeyAndSymetricKeyArray,
        encryptedLocalPublicKeyAndClientSymetricKeyXml;

      returnData = {
        serverPublicKey: getPublicKeyResult.PublicKeyXmlString, //Public key content
        callNode: getPublicKeyResult.NodeAnswered, //For call affinity
        publicKeyToken: getPublicKeyResult.KeyToken, //Public Key Token ID
        rsaProvider: new System.Security.Cryptography.RSACryptoServiceProvider(512), //Create a local provider to create a new asymetric key pair to allow the server to crypte it's symetric key'
        symetricKeyClientPart: CryptoCaller.randomArray(16, 255)  //Half of the symetric key (CLIENT).
      };

      //Create the rsa provider from the server side received key
      remotePublicRsaProvider = new System.Security.Cryptography.RSACryptoServiceProvider();
      remotePublicRsaProvider.FromXmlString(returnData.serverPublicKey);

      //Encrypt both key
      var localPublicKeyUtf8Array = System.Text.Encoding.UTF8.GetBytes(returnData.rsaProvider.ToXmlString(false));
      mergedPublicKeyAndSymetricKeyArray = returnData.symetricKeyClientPart.concat(localPublicKeyUtf8Array);

      encryptedLocalPublicKeyAndClientSymetricKeyXml = remotePublicRsaProvider.Encrypt(mergedPublicKeyAndSymetricKeyArray, false);

      returnData.cryptedPublicKeyAndClientSymetricBase64 = System.Convert.ToBase64String(encryptedLocalPublicKeyAndClientSymetricKeyXml);

      return returnData;
    }

    /**
     * Echanger ls clé entre l'application et le serveur TIB FINANCE
     * 
     * @param {*} data 
     * @returns 
     */
    static performKeyExchange(data) {
      //Prepare the crypted key data to be transmited to the server.
      //Must provide the node received for service affinity and the related key Token to allow the service to use the right private key.
      var keyExchangeData = {
        CallNode: data.callNode,
        KeyToken: data.publicKeyToken,
        AsymetricClientPublicKeyAndClientSymetricXmlBase64: data.cryptedPublicKeyAndClientSymetricBase64
      };
  
      return new Promise(function (resolve, reject) {
        $.ajax({
          url: CryptoCaller.serverURL + "/data/ExecuteKeyExchange",
          method: "POST",
          data: JSON.stringify({ key: keyExchangeData }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (callResult, status, xhr) {
            resolve({
              callNode: data.callNode,
              keyToken: callResult.FullSymetricKeyToken,
              key: data.symetricKeyClientPart.concat(data.rsaProvider.Decrypt(System.Convert.FromBase64String(callResult.SymetricHostHalfKey))),
              iv: CryptoCaller.randomArray(16, 255)
            });
          },
          Error: reject
        });
      });
    }

    /**
     * Exécuter un appel vers l'API TIB FINANCE
     * 
     * @param {*} url : Le nom de la méthode à appeler côté TIB FINANCE (Ex: '/Data/ListCustomers')
     * @param {*} cryptedData : Les données cryptées à envoyer vers TIB FINANCE
     * @returns 
     */
    static performTheCall(url, cryptedData) {
        var data = {
          CallNode: cryptedData.callNode,
          KeyToken: cryptedData.keyToken,
          Base64IV: cryptedData.ivBase64,
          Base64CryptedData: cryptedData.data
        };
    
        return new Promise(function (resolve, reject) {
          $.ajax({
            url: CryptoCaller.serverURL + url,
            type: "POST",
            data: JSON.stringify({ data: data }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
              resolve({
                cryptedData: data.CryptedBase64Data,
                iv: data.IV
              });
            },
            error: reject
          });
        });
    }

    //Tools
    static randomArray(length, max) {
      return Array.apply(null, Array(length)).map(function () {
        return Math.round(Math.random() * max);
      });
    }

    /**
     * Exécuter un appel vers l'API TIB FINANCE
     * 
     * @param {*} url : Le nom de la méthode à appeler côté TIB FINANCE (Ex: '/Data/ListCustomers')
     * @param {*} cryptedData : Les données cryptées à envoyer vers TIB FINANCE
     * @returns 
     */
    static performCall(url, data) {
      console.log(data)
      return new Promise(function (resolve, reject) {
        let encryptionKey;
        CryptoCaller.getCryptedCallKeyData()
          .then(function (callEncryptionKey) {
            encryptionKey = callEncryptionKey.key;
            return CryptoCaller.cryptData(data, callEncryptionKey);
          })
          .then(function (cryptedData) { return CryptoCaller.performTheCall(url, cryptedData); })
          .then(function (cryptedCallResult) { return CryptoCaller.decryptCallData(cryptedCallResult, encryptionKey); })
          .then(function (decryptedData) {
            resolve(decryptedData);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    }

   
    
    /**
     * Crypter la clé symetric et echanger les clés
     * 
     * @returns 
     */
    static getCryptedCallKeyData() {
      return new Promise(function (resolve, reject) {
        CryptoCaller.getPublicKey()
          .then(CryptoCaller.cryptKeys)//Crypt the symetric key and the local PublicKey(that the server will use the crypt the return) using the server provided public key.
          .then(function (data) { return CryptoCaller.performKeyExchange(data); })
          .then(resolve)
          .catch(reject);
      });
    }

    /**
     * Crypter les données
     * 
     * @param {*} data 
     * @param {*} callEncryptionKey 
     * @returns 
     */
    static cryptData(data, callEncryptionKey) {
      var stringToCrypt, byteArrayToCrypt;
  
      stringToCrypt = JSON.stringify(data);
      byteArrayToCrypt = System.Text.Encoding.UTF8.GetBytes(stringToCrypt);
  
      return {
        callNode: callEncryptionKey.callNode,
        keyToken: callEncryptionKey.keyToken,
        ivBase64: System.Convert.ToBase64String(callEncryptionKey.iv),
        data: CryptoCaller.encryptRijdnael(callEncryptionKey.key, callEncryptionKey.iv, byteArrayToCrypt)
      };
    }

    /**
     * Méthode de cryptage utilisée pour crypter les données
     * 
     * @param {*} key 
     * @param {*} iv 
     * @param {*} input 
     * @returns 
     */
    static encryptRijdnael(key, iv, input) {
      // Create an instance of the Rijndael class.
      var cipher = new System.Security.Cryptography.RijndaelManaged();
      // Get cryptor as System.Security.Cryptography.ICryptoTransform class.
      var cryptor = cipher.CreateEncryptor(key, iv);
      // Create new Input.
      return CryptoCaller.CipherStreamWriteToB64(cryptor, input);
    }

    static CipherStreamWriteToB64(cryptor, input) {
      var outputBuffer = CryptoCaller.CipherStreamWrite(cryptor, input);
      return System.Convert.ToBase64String(outputBuffer);
    }

    static CipherStreamWrite(cryptor, input) {
      var bufferLength = 0;
  
      if (input.length) {
        bufferLength = input.length;
      } else if (input.byteLength) {
        bufferLength = input.byteLength;
      }
      var inputBuffer = new System.Byte(bufferLength);
      // Copy data bytes to input buffer.
      System.Buffer.BlockCopy(input, 0, inputBuffer, 0, inputBuffer.length);
      // Create a MemoryStream to hold the output bytes.
      var stream = new System.IO.MemoryStream();
      // Create a CryptoStream through which we are going to be processing our data.
      var mode = System.Security.Cryptography.CryptoStreamMode.Write;
      var cryptoStream = new System.Security.Cryptography.CryptoStream(stream, cryptor, mode);
      // Start the crypting process.
      cryptoStream.Write(inputBuffer, 0, inputBuffer.length);
      // Finish crypting.
      cryptoStream.FlushFinalBlock();
      // Convert data from a memoryStream into a byte array.
      var outputBuffer = stream.ToArray();
      // Close both streams.
      stream.Close();
      cryptoStream.Close();
      return outputBuffer;
    }

    /**
     * Décrypter les données
     * 
     * @param {*} cryptedCallResult 
     * @param {*} encryptionKey 
     * @returns 
     */
    static decryptCallData(cryptedCallResult, encryptionKey) {
      var decryptedResponse;
  
      decryptedResponse = CryptoCaller.decryptRijdnael(encryptionKey, cryptedCallResult.iv, System.Convert.FromBase64String(cryptedCallResult.cryptedData));
  
      return JSON.parse(decryptedResponse);
    }

    /**
     * Méthode utilisée pour décrypter les données
     * 
     * @param {*} key 
     * @param {*} iv 
     * @param {*} input 
     * @returns 
     */
    static decryptRijdnael(key, iv, input) {
      // Create an instance of the Rijndael class.
      var cipher = new System.Security.Cryptography.RijndaelManaged();
      // Get cryptor as System.Security.Cryptography.ICryptoTransform class.
      var cryptor = cipher.CreateDecryptor(key, iv);
      // Create new Input.
      return CryptoCaller.CipherStreamRead(cryptor, input);
    }

    static CipherStreamRead(cryptor, input) {
      var outputBuffer = CryptoCaller.CipherStreamReadBytes(cryptor, input);
      return System.Text.Encoding.UTF8.GetString(outputBuffer);
    }

    static CipherStreamReadBytes(cryptor, input) {
      var bufferLength = 0;
  
      if (input.length) {
        bufferLength = input.length;
      } else if (input.byteLength) {
        bufferLength = input.byteLength;
      }
      var inputBuffer = new System.Byte(bufferLength);
      // Copy data bytes to input buffer.
      System.Buffer.BlockCopy(input, 0, inputBuffer, 0, bufferLength);
      // Create a MemoryStream to hold the output bytes.
      var stream = new System.IO.MemoryStream();
  
      // Create a CryptoStream through which we are going to be processing our data.
      var mode = System.Security.Cryptography.CryptoStreamMode.Write;
      var cryptoStream = new System.Security.Cryptography.CryptoStream(stream, cryptor, mode);
      // Start the crypting process.
      cryptoStream.Write(inputBuffer, 0, bufferLength);
      // Finish crypting.
      cryptoStream.FlushFinalBlock();
      // Convert data from a memoryStream into a byte array.
      var outputBuffer = stream.ToArray();
      // Close both streams.
      stream.Close();
      cryptoStream.Close();
  
      return outputBuffer;
    }

    static getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  
    static setCookie(name, value, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        var time = days * 24 * 60 * 60 * 1000;
        date.setTime(date.getTime() + time);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
}