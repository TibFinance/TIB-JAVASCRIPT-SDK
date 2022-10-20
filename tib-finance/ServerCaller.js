class ServerCaller {

    static initalize(baseUrl){
        CryptoCaller.initialize(baseUrl)
    }

    static createSession(clientId, username, password) {
        var methodName = "/Data/CreateSession";
        var data = {
            ClientId: clientId,
            Username: username,
            Password: password
        };
        return CryptoCaller.performCall(methodName, data)
    }
    static createCustomer(customerName, externalId, language = 1, customerDescription, serviceId, sessionToken) {
        CryptoCaller.createSession();

        var methodName = "/Data/CreateCustomer";
        var data = {
            Customer:
            {
                CustomerName: customerName,
                CustomerExternalId: externalId,
                Language: language,
                CustomerDescription: customerDescription,

            },
            ServiceId: serviceId,
            SessionToken: sessionToken
        };

        var serviceId = "038D7171-BF23-4F3C-9E78-CF6342624FC7";
        var clientId = "4671a4c9-4367-4934-bb23-a8886cebd028";
        var userName = "sdkdev";
        var password = "Test123!";

        // // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static listCustomers(serviceId, sessionToken) {
        var methodName = "/Data/ListCustomers"
        var data = {
            ServiceId: serviceId,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static getCustomer(customerId, sessionToken) {
        var methodName = "/Data/GetCustomer"
        var data = {
            CustomerId: customerId,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static getCustomersByExternalId(externalCustomerId, sessionToken) {
        var methodName = "/Data/GetCustomersByExternalId";
        var data = { ExternalCustomerId: externalCustomerId, SessionToken: sessionToken };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static saveCustomer(customerId, customerName, externalId, language = 1, customerDescription, sessionToken) {
        var methodName = "/Data/SaveCustomer"
        var data = {
            Customer: {
                CustomerId: customerId,
                CustomerName: customerName,
                CustomerExternalId: externalId,
                Language: language,
                CustomerDescription: customerDescription
            },
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static deleteCustomer(customerId, sessionToken) {
        var methodName = "/Data/DeleteCustomer"
        var data = { CustomerId: customerId, SessionToken: sessionToken };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static CreateMerchant(merchantInfo, serviceId, sessionToken) {
        var methodName = "/Data/CreateMerchant";
        var data = {
            ServiceId: serviceId,
            MerchantInfo: merchantInfo,
            SessionnToken: sessionToken
        }
        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static ListTransfers(sessionToken, fromDate, toDate, externalMerchantGroupId, levelFilterId, markResolvedOnly, paymentFilterLevel, transferType, transferGroupId, onlyWithErrors) {
        var methodName = "/data/ListTransfers";
        var data = {
            SessionToken: sessionToken,
            FromDate: fromDate,
            ExternalMerchantGroupId: externalMerchantGroupId,
            LevelFilterId: levelFilterId,
            MarkResolvedOnly: markResolvedOnly,
            PaymentFilterLevel: paymentFilterLevel,
            TransferType: transferType,
            ToDate: toDate,
            TransferGroupId: transferGroupId,
            OnlyWithErrors: onlyWithErrors
        };
        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static ListTransfersFast(sessionToken, merchantId, fromDate, toDate, externalMerchantGroupId, markResolvedOnly, transferType, transferGroupId, onlyWithErrors) {
        var methodName = "/data/ListTransfers";
        var data = {
            SessionToken: sessionToken,
            FromDate: fromDate,
            ExternalMerchantGroupId: externalMerchantGroupId,
            LevelFilterId: levelFilterId,
            MarkResolvedOnly: markResolvedOnly,
            PaymentFilterLevel: paymentFilterLevel,
            TransferType: transferType,
            ToDate: toDate,
            TransferGroupId: transferGroupId,
            OnlyWithErrors: onlyWithErrors,
            MerchantId: merchantId
        };
        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static ListTransfersForBillFast(sessionToken, merchantId, billId) {
        var methodName = "/data/ListTransfersForBillFast";
        var data = {
            SessionToken: sessionToken,
            BillId: billId,
            MerchantId: merchantId
        }
        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static ListMerchants(serviceId, sessionToken) {
        var methodName = "/Data/ListMerchants";
        var data = {
            ServiceId: sessionId,
            SessionToken: sessionToken
        }
        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static GetMerchant(merchantId, sessionToken) {
        var methodName = "/Data/GetMerchant";
        var data = {
            MerchanntId: merchantId,
            SessionToken: sessionToken
        };
        return CryptoCaller.performCall(methodName, data)
    }

    static SaveMerchant(merchantId, merchantInfo, sessionToken) {
        var methodName = "/Data/SaveMerchant";
        var data = {
            MerchantId: merchantId,
            MerchantInfo: merchantInfo,
            SessionToken: sessionToken
        };
        return CryptoCaller.performCall(methodName, data)
    }

    static SaveMerchantBasicInfo(merchantId, merchantBasicInfo, sessionToken) {
        var methodName = "/Data/SaveMerchantBasicInfo";
        var data = {
            MerchantId: merchantId,
            MerchantInfo: merchantBasicInfo,
            SessionToken: sessionToken
        };
        return CryptoCaller.performCall(methodName, data)
    }

    static SaveMerchantAccountInfo(merchantId, merchantAccount, sessionToken) {
        var methodName = "/Data/SaveMerchantAccountInfo";
        var data = {
            MerchantId: merchantId,
            Account: merchantAccount,
            SessionToken: sessionToken
        };
        return CryptoCaller.performCall(methodName, data)
    }

    static DeleteMerchant(merchantId, sessionToken) {
        var methodName = "/Data/DeleteMerchant";
        var datat = {
            MerchanntId: merchantId,
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data)
    }

    //Payments / Transfers methodes :

    static createCreditCardObject(pan, cvd, expirationMonth, expirationYear, creditCardDescription, cardOwner, streetAddress, addressCity, provinceStateId, countryId, postalZipCode, sessionToken) {
        return {
            Pan: pan,
            Cvd: cvd,
            ExpirationMonth: expirationMonth,
            ExpirationYear: expirationYear,
            CreditCardDescription: creditCardDescription,
            CardOwner: cardOwner,
            CreditCardRegisteredAddress: {
                StreetAddress: streetAddress,
                AddressCity: addressCity,
                ProvinceStateId: provinceStateId,
                CountryId: countryId,
                PostalZipCode: postalZipCode
            }
        };
    }

    static createCreditCardPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, creditCardObject, sessionToken) {
        var methodName = "/Data/CreateCreditCardPaymentMethod";

        var data = {
            CustomerId: customerId,
            SessionToken: sessionToken,
            IsCustomerAutomaticPaymentMethod: isCustomerAutomaticPaymentMethod,
            CreditCard: creditCardObject
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static createBankAccountObject(owner, accountName, bankNumber, institutionNumber, accountNumber, sessionToken) {
        return {
            Owner: owner,
            AccountName: bankNumber,
            BankNumber: bankNumber,
            InstitutionNumber: institutionNumber,
            AccountNumber: accountNumber
        };
    }

    static createDirectAccountPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, accountObject, sessionToken) {
        var methodName = "/Data/CreateDirectAccountPaymentMethod";

        var data = {
            CustomerId: customerId,
            SessionToken: sessionToken,
            IsCustomerAutomaticPaymentMethod: isCustomerAutomaticPaymentMethod,
            Account: accountObject
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static createInteracObject(description, owner, targetEmailAddress, targetMobilePhoneNumber, interacQuestion, interacAnswer, sessionToken) {
        return {
            Description: description,
            Owner: owner,
            TargetEmailAddress: targetEmailAddress,
            TargetMobilePhoneNumber: targetMobilePhoneNumber,
            InteracQuestion: interacQuestion,
            InteracAnswer: interacAnswer
        };
    }

    static createInteracPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, interacObject, sessionToken) {
        var methodName = "/Data/CreateInteracPaymentMethod";

        var data = {
            CustomerId: customerId,
            SessionToken: sessionToken,
            IsCustomerAutomaticPaymentMethod: isCustomerAutomaticPaymentMethod,
            InteracInformation: interacObject
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static getPaymentMethod(paymentMethodId, sessionToken) {
        var methodName = "/Data/GetPaymentMethod"
        var data = {
            SessionToken: sessionToken,
            PaymentMethodId: paymentMethodId
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static listPaymentMethods(customerId, sessionToken) {
        var methodName = "/Data/ListPaymentMethods"
        var data = {
            CustomerId: customerId,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static setDefaultPaymentMethod(paymentMethodId, customerId, sessionToken) {
        var methodName = "/Data/SetDefaultPaymentMethod"
        var data = {
            PaymentMethodId: paymentMethodId,
            CustomerId: customerId,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static ChangeInteracPaymentMethodQuestionAndAnswer(interacPaymentMethodId, interacQuestion, interacAnswer, SessionToken) {
        var methodName = "/data/ChangeInteracPaymentMethodQuestionAndAnswer";
        var data = {
            InteracPaymentMethodId: interacPaymentMethodId,
            InteracQuestion: interacQuestion,
            InteracAnswer: interacAnswer,
            SessionToken: SessionToken
        }
        return CryptoCaller.performCall(methodName, data)
    }

    static deletePaymentMethod(paymentMethodId, sessionToken) {
        var methodName = "/Data/DeletePaymentMethod"
        var data = {
            PaymentMethodId: paymentMethodId,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static deletePayment(paymentId, SessionToken){
        var methodName = "/Data/DeletePayment";

        var data ={
            PaymentId :paymentId,
            SessionToken :SessionToken
        };
        return CryptoCaller.performCall(methodName, data);
    }

    static createBill(breakIfMerchantNeverBeenAuthorized, billDataObject, sessionToken) {
        var methodName = "/Data/CreateBill"
        var data = {
            BreakIfMerchantNeverBeenAuthorized: breakIfMerchantNeverBeenAuthorized,
            BillData: billDataObject,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static listBills(merchantId, serviceId, fromDateTime, toDateTime, sessionToken) {
        var methodName = "/Data/ListBills"
        var data = {
            ServiceId: serviceId, 
            MerchantId: merchantId,
            FromDateTime: fromDateTime,
            FromDateTime: toDateTime,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static getBill(billId, sessionToken) {
        var methodName = "/Data/GetBill"
        var data = {
            billId: billId,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static deleteBill(billId, sessionToken) {
        var methodName = "/Data/DeleteBill"
        var data = {
            billId: billId,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static createPayment(billId, setPaymentCustomerFromBill, CustomerEmail, paymentInfo, externalReferenceId, askForCustomerConsent, safetyToBreakIfOverRemainingBillAmount, autorizedPaymentMethod, doNotSendEmail, statementDescription, sessionToken) {
        var methodName = "/Data/CreatePayment"
        var data = {
            BillId: billId,
            SetPaymentCustomerFromBill: setPaymentCustomerFromBill,
            CustomerEmail: CustomerEmail,
            PaymentInfo: paymentInfo,
            ExternalReferenceId: externalReferenceId,
            AskForCustomerConsent: askForCustomerConsent,
            SafetyToBreakIfOverRemainingBillAmount: safetyToBreakIfOverRemainingBillAmount,
            AutorizedPaymentMethod: autorizedPaymentMethod,
            DoNotSendEmail: doNotSendEmail,
            StatementDescription: statementDescription,

            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static createDirectDeposit(originMerchantId, destinationAccount, depositDueDate, currency, language, referenceNumber, amount, sessionToken) {
        var methodName = "/Data/CreateDirectDeposit"
        var data = {
            OriginMerchantId: originMerchantId,
            DestinationAccount: destinationAccount,
            DepositDueDate: depositDueDate,
            Currency: currency,
            Language: language,
            ReferenceNumber: referenceNumber,
            Amount: amount,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static createDirectInteracTransaction(originMerchantId, destinationAccount, depositDueDate, currency, language, referenceNumber, amount, sessionToken) {
        var methodName = "/Data/CreateDirectDeposit"
        var data = {
            OriginMerchantId: originMerchantId,
            DestinationAccount: destinationAccount,
            DepositDueDate: depositDueDate,
            Currency: currency,
            Language: language,
            ReferenceNumber: referenceNumber,
            Amount: amount,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static createTransactionFromRaw(merchantId, rawAcpFileContent, sessionToken) {
        var methodName = "/Data/CreateTransactionFromRaw"
        var data = {
            MerchantId: merchantId,
            RawAcpFileContent: rawAcpFileContent,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static createFreeOperation(merchantId, paymentMethodId, transferType, referenceNumber, amount, language, transactionDueDate, groupId, transferFrequency, sessionToken) {
        var methodName = "/Data/CreateFreeOperation"
        var data = {
            MerchantId: merchantId,
            PaymentMethodId: paymentMethodId,
            TransferType: transferType,
            ReferenceNumber: referenceNumber,
            Amount: amount,
            Language: language,
            TransactionDueDate: transactionDueDate,
            GroupId: groupId,
            TransferFrequency: transferFrequency,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static deletePayment(paymentId, sessionToken) {
        var methodName = "/Data/DeletePayment"
        var data = {
            PaymentId: paymentId,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static revertTransfer(transferId, sessionToken) {
        var methodName = "/Data/RevertTransfer"
        var data = { TransferId: transferId, SessionToken: sessionToken };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static getRecuringTransfers(serviceId, sessionToken) {
        var methodName = "/Data/GetRecuringTransfers"
        var data = { ServiceId: serviceId, SessionToken: sessionToken };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static deleteRecuringTransfer(recuringTransferId, sessionToken) {
        var methodName = "/Data/DeleteRecuringTransfer"
        var data = { RecuringTransferId: recuringTransferId, SessionToken: sessionToken };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    static listExecutedOperations(fromDate, toDate, transferType, transferGroupId,
        onlyWithErrors, merchantId, dateType, sessionToken) {
        var methodName = "/Data/listExecutedOperations"
        var data = {
            FromDate: fromDate,
            ToDate: toDate,
            TransferType: transferType,
            TransferGroupId: transferGroupId,
            OnlyWithErrors: onlyWithErrors,
            MerchantId: merchantId,
            DateType: dateType,
            SessionToken: sessionToken
        };

        // return CryptoCaller.callTibFinance(methodName, data);

        return CryptoCaller.performCall(methodName, data)
    }

    //// WhiteLabeling Section

    static SetwhiteLabeling(id, level, whitelabelingData, sessionToken) {
        var methodName = "/Data/SetWhiteLabeling";
        var data = {
            Id: id,
            WhitelabelingLevel: level,
            WhiteLabelingData: whitelabelingData,
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data)
    }

    static GetWhiteLabelingData(id, level, sessionToken) {
        var methodName = "/Data/GetWhiteLabelingData";
        var data = {
            Id: id,
            WhitelabelingLevel: level,
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data)
    }
    
    static updateWhiteLabelingData(id, level, whitelabelingData, sessionToken) {
        var methodName = "/Data/UpdateWhiteLabelingData";
        var data = {
            Id: id,
            WhitelabelingLevel: level,
            WhiteLabelingData: whitelabelingData,
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data);
    }

    static deleteWhiteLabelingData(id, level, whitelabelingData, sessionToken) {
        var methodName = "/Data/DeleteWhiteLabeling";
        var data = {
            Id: id,
            WhitelabelingLevel: level,
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data)
    }

    static getListWhiteLabelingData(sessionToken) {
        var methodName = "/Data/GetListWhiteLabelingData";
        var data = {
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data);
    }

    /// Sub Client's Methods . 
    static setClientDefaultServiceFeeSettings(clienntId, serviceFeeSettinngs, sessionToken) {
        var methodName = "/Data/SetClientDefaultServiceFeeSettings";
        var data = {
            ClientId: clientId,
            ServicefeeSettings: serviceFeeSettinngs,
            SessionToken: sessionToken
        }

        return CryptoCaller.performCall(methodName, data);
    }

    static CreateSubClient(name, language, SessionToken) {
        var methodName = "/Data/CreateSubClient";

        var data = {
            Name: name, Language: language, SessionToken: SessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }

    static SetClientSettings(clientId, clientSettings, SessionToken) {
        var methodName = "/Data/SetClientSettings";

        var data = {
            CLientId: clientId,
            ClientSettings: clientSettings,
            SessionToken: SessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }

    static GetClientSettings(clientId, SessionToken) {
        var methodName = "/Data/GetClientSettings";

        var data = {
            ClientId: clientId,
            SessionToken: SessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }

    static MarkPaymentResolved(listOfPayment, sessionToken) {
        var methodName = "/Data/MarkPaymentResolved";

        var data = {
            ListOfPayment: listOfPayment,
            SessionToken: sessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }

    static GetMerchantsByExternalId(externalSystemId, externalSystemGroupId, sessionToken) {
        var methodName = "/Data/GetMerchantsByExternalId";

        var data = {
            ExternalSystemId: externalSystemId,
            ExternalSystemGroupId: externalSystemGroupId,
            SessionToken: sessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }
    static GetMerchant(merchantId, sessionToken)
    {
        var methodName = "/Data/GetMerchant";

        var data = {
            MerchantId :merchantId,
            SessionToken:sessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }

    static ForcePaymentProcess(paymentId, sessionToken) {
        var methodName = "/Data/ForcePaymentProcess";

        var data = {
            PaymentId: paymentId,
            SessionToken: sessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }

    static Login() {
        var smethodName = "/Data/Login";

        var data = {
            ClientIdUsername: clientId,
            LoginsUserRelationsId: loginsUserRelationsId,
            Username: username,
            Password: password,
            SessionToken: sessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }

    static GetLoginAccessList(clientId, username, password, sessionToken) {
        var methodName = "/Data/Login";

        var data = {
            ClientId: clientId,
            LoginsUserRelationsId: loginsUserRelationsId,
            Username: username,
            Password: password,
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data);
    }

    static GetDropInPublicToken(clientId,
        billId,
        amount,
        transferType,
        dropInAuthorizedPaymentMethod,
        externalReferenceNumber,
        showCustomerExistingPaymentMethods,
        language,
        expirationDays,
        title,
        description,
        paymentDueDate,
        merchantId,
        sessionToken) {
            var methodName = "/Data/GetDropInPublicToken";

        var data = {
            CustomerId: clientId,
            BillId: billId,
            Amount: amount,
            TransferType: transferType,
            DropInAuthorizedPaymentMethod: dropInAuthorizedPaymentMethod,
            ExternalReferenceNumber: externalReferenceNumber,
            ShowCustomerExistingPaymentMethods: showCustomerExistingPaymentMethods,
            Language: language,
            ExpirationDays: expirationDays,
            Title: title,
            Description: description,
            PaymentDueDate: paymentDueDate,
            MerchantId: merchantId,
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data);
    }

    static AddNewDasProvider(merchantId, DasProviderType, DasProviderQuebec, DasProviderCanada, sessionToken) {
        var methodName = "/Data/AddNewDasProvider";

        var data = {
            MerchantId: merchantId,
            DasProviderType: DasProviderType,
            DasProviderQuebec: DasProviderQuebec,
            DasProviderCanada: DasProviderCanada,
            SessionToken: sessionToken
        };

        return CryptoCaller.performCall(methodName, data);
    }

    static AddNewDasPayment(
        merchantId,
        DasProviderId,
        DasPaymentProviderType,
        DasPaymentCanada,
        DasPaymentQuebec,
        sessionToken) {
        var methodName = "/Data/AddNewDasPayment";
        var data = {
            MerchantId: merchantId,
            DasProviderId: DasProviderId,
            DasPaymentProviderType: DasPaymentProviderType,
            DasPaymentCanada: DasPaymentCanada,
            DasPaymentQuebec: DasPaymentQuebec,
            SessionToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data)
    }

    static ListDasProviders(merchantId, sessionToken) {
        var methodName = "/Data/ListDasProviders";
        var data = {
            MerchantId: merchantId,
            SesisonToken: sessionToken
        }
        return CryptoCaller.performCall(methodName, data);
    }

    static ListDasPayments(merchantId, dasProviderId, sessionToken) {
        var methodName = "/Data/ListDasPayments";
        var data = {
            MerchanntId: merchantId,
            dasProviderId: dasProviderId,
            SessionToken: sessionToken
        };
        return CryptoCaller.performCall(methodName, data);
    }

    static ListServices(merchantId, sessionToken) {
        var methodName = "/Data/ListServices";

        var data = { MerchantId: merchantId, SessionToken: sessionToken };

        return CryptoCaller.performCall(methodName, data);
    }

    static GetService(serviceId, sessionToken) {
        var methodName = "/Data/GetService";
        var data = {
            ServiceId: serviceId,
            SessionToken: sessionToken
        };
        return CryptoCaller.performCall(methodName, data);
    }

}