/**
 * Exemple d'utilisation de API TIB FINANCE SDK
 */

 var serviceId = "038D7171-BF23-4F3C-9E78-CF6342624FC7";
 var clientId = "4671a4c9-4367-4934-bb23-a8886cebd028";
 var userName = "sdkdev";
 var password = "Test123!"

$(document).on("click", "#createSession", function(){
    var data = {"Customer": {"CustomerName": "new Customer", "CustomerExternalId": "c123-59", "Language": "1", "CustomerDescription": "VIP Customer"}};

    $("#result").html("");
    showProgress();

    var name = "Customer 100";
    var externalId = "1122ZEE";
    var language = 1;
    var description = "Customer created from new JS SDK methods";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createSession(clientId, userName, password)
        .then(function (result){
            console.log(result)
            var _html = "<h4>CustomerId : </h4> " + result.SessionId;
            hideProgress();
            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#listCustomer", function(){
    $("#result").html("");
    showProgress();

    

    new Promise(function(resolve, reject){
        ServerCaller.listCustomers(serviceId, "8bdf7d18-a656-47b4-9983-8a0387b78e0e")
        .then(function (result){
            console.log(result)
            var _html = "<table class='table'>";
            _html += "<thead><tr><th>CustomerId</th><th>CustomerName</th><th>CustomerExternalId</th><th>Language</th><th>Customer Description</th></tr></thead>";
            _html += "<tbody>";
            for(var i=0; i<result.Customers.length; i++)
            {
                _html += "<tr>";
                _html += "<td>" + JSON.stringify(result.Customers[i].CustomerId) + "</td>";
                _html += "<td>" + JSON.stringify(result.Customers[i].CustomerName) + "</td>";
                _html += "<td>" + JSON.stringify(result.Customers[i].CustomerExternalId) + "</td>";
                _html += "<td>" + JSON.stringify(result.Customers[i].Language) + "</td>";
                _html += "<td>" + JSON.stringify(result.Customers[i].CustomerDescription) + "</td>";
                _html += "</tr>";
            }

            _html += "</tbody>";
            _html += "</table>";

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#getOneCustomer", function(){
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";


    new Promise(function(resolve, reject){
        ServerCaller.getCustomer(customerId, "8bdf7d18-a656-47b4-9983-8a0387b78e0e")
        .then(function (result){
            var _html = "<table class='table'>";
            _html += "<thead><tr><th>CustomerId</th><th>CustomerName</th><th>CustomerExternalId</th><th>Language</th><th>Customer Description</th></tr></thead>";
            _html += "<tbody>";
            _html += "<tr>";
            _html += "<td>" + JSON.stringify(result.Customer.CustomerId) + "</td>";
            _html += "<td>" + JSON.stringify(result.Customer.CustomerName) + "</td>";
            _html += "<td>" + JSON.stringify(result.Customer.CustomerExternalId) + "</td>";
            _html += "<td>" + JSON.stringify(result.Customer.Language) + "</td>";
            _html += "<td>" + JSON.stringify(result.Customer.CustomerDescription) + "</td>";
            _html += "</tr>";

            _html += "</tbody>";
            _html += "</table>";

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#getCustomerByExternalId", function(){
    $("#result").html("");
    showProgress();

    var customerExternalId = "1122ZEE";

    new Promise(function(resolve, reject){
        ServerCaller.getCustomersByExternalId(customerExternalId, "8bdf7d18-a656-47b4-9983-8a0387b78e0e")
        .then(function (result){
            console.log(result)
            var _html = "<table class='table'>";
            _html += "<thead><tr><th>CustomerId</th><th>CustomerName</th><th>CustomerExternalId</th><th>Language</th><th>Customer Description</th></tr></thead>";
            _html += "<tbody>";
            result.Customers.forEach(element => {
                _html += "<tr>";
                _html += "<td>" + JSON.stringify(element.CustomerId) + "</td>";
                _html += "<td>" + JSON.stringify(element.CustomerName) + "</td>";
                _html += "<td>" + JSON.stringify(element.CustomerExternalId) + "</td>";
                _html += "<td>" + JSON.stringify(element.Language) + "</td>";
                _html += "<td>" + JSON.stringify(element.CustomerDescription) + "</td>";
                _html += "</tr>";
            });
           

            _html += "</tbody>";
            _html += "</table>";

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#saveCustomer", function(){
    $("#result").html("");
    showProgress();

    var customerId = "d215b447-7746-4865-b9fa-78e72a2f5678";
    var customerName = "Customer 100 updated";
    var externalId = "1122ZEE";
    var language = 2;
    var customerDescription = "Customer updated from new JS SDK methods";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.saveCustomer(customerId, customerName, externalId, language, customerDescription)
        .then(function (result){
            hideProgress();
        })
        .catch(reject);
    });
});

$(document).on("click", "#deleteCustomer", function(){
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.deleteCustomer(customerId)
        .then(function (result){
            hideProgress();
        })
        .catch(reject);
    });
});

$(document).on("click", "#directAccountPaymentMethod", function(){
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var isCustomerAutomaticPaymentMethod = true;
    var account = ServerCaller.createBankAccountObject("Jeff Testing", "Personal bank account", "003", "12345", "9876543");

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);
	
    new Promise(function(resolve, reject){
        ServerCaller.createDirectAccountPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, account)
        .then(function (result){
            var _html = "<h4>PaymentMethodId : </h4> " + result.PaymentMethodId;
            hideProgress();
            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#creditCardPaiementMethode", function(){
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var isCustomerAutomaticPaymentMethod = true;
	var CreditCard = ServerCaller.createCreditCardObject("4242424242424242", "123", "12", "24", "Test Card", "Johny Cardholder", "1 Testing road", "Testcity", "10", "1", "H1H1H1");
	
    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createCreditCardPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, CreditCard)
        .then(function (result){
            var _html = "<h4>PaymentMethodId : </h4> " + result.PaymentMethodId;
            hideProgress();
            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#interacPaiementMethode", function(){
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var isCustomerAutomaticPaymentMethod = true;
	var InteracInformation = ServerCaller.createInteracObject("Interac Test", "Kelly Interac", "kinterac@dummytest.com", "8881234567", "Remember the fruit", "Orange");

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createInteracPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, InteracInformation)
        .then(function (result){
            var _html = "<h4>PaymentMethodId : </h4> " + result.PaymentMethodId;
            hideProgress();
            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#getPayementMethod", function(){
    $("#result").html("");
    showProgress();

    var paymentMethodId = " b1d3ca2c-8c04-4c03-8de4-7a5f464198e2";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.getPaymentMethod(paymentMethodId)
        .then(function (result){
            var _html = "<table class='table'>";
            _html += "<thead><tr><th>Payment Method Id</th><th>Payment Method Description</th><th>Payment Method Type</th><th>Payment Method Owner</th></tr></thead>";
            _html += "<tbody>";
            _html += "<tr>";
            _html += "<td>" + JSON.stringify(result.PaymentMethod.PaymentMethodId) + "</td>";
            _html += "<td>" + JSON.stringify(result.PaymentMethod.PaymentMethodDescription) + "</td>";
            _html += "<td>" + JSON.stringify(result.PaymentMethod.PaymentMethodType) + "</td>";
            _html += "<td>" + JSON.stringify(result.PaymentMethod.Owner) + "</td>";
            _html += "</tr>";

            _html += "</tbody>";
            _html += "</table>";

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#listPayementMethods", function(){
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.listPaymentMethods(customerId)
        .then(function (result){
            var _html = "<table class='table'>";
            _html += "<thead><tr><th>Payment Method Id</th><th>Payment Method Description</th><th>Payment Method Type</th><th>Payment Method Owner</th><th>Is Customer Automatic Payment Method</th></tr></thead>";
            _html += "<tbody>";
            for(var i=0; i<result.PaymentMethods.length; i++)
            {
                _html += "<tr>";
                _html += "<td>" + JSON.stringify(result.PaymentMethods[i].PaymentMethodId) + "</td>";
                _html += "<td>" + JSON.stringify(result.PaymentMethods[i].PaymentMethodDescription) + "</td>";
                _html += "<td>" + JSON.stringify(result.PaymentMethods[i].PaymentMethodType) + "</td>";
                _html += "<td>" + JSON.stringify(result.PaymentMethods[i].Owner) + "</td>";
                _html += "<td>" + JSON.stringify(result.PaymentMethods[i].IsCustomerAutomaticPaymentMethod) + "</td>";
                _html += "</tr>";
            }

            _html += "</tbody>";
            _html += "</table>";

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#setDefaultPaymentMethod", function(){
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var payementMethodId = "b1d3ca2c-8c04-4c03-8de4-7a5f464198e2";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.setDefaultPaymentMethod(payementMethodId, customerId)
        .then(function (result){

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#deletePaymentMethod", function(){
    $("#result").html("");
    showProgress();

    var payementMethodId = "0ce18bb1-5fef-40f1-892f-828a1fc21b97";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.deletePaymentMethod(payementMethodId)
        .then(function (result){

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#createBill", function(){
    var billObject =  {
                            MerchantId: "ea34f2c6-36b2-4513-973e-a2c91e7985d3",
                            BillTitle: "test interac",
                            BillDescription: "test created by JS SDK",
                            BillAmount: 1,
                            ExternalSystemBillNumber1: "",
                            ExternalSystemBillNumber2: "",
                            ExternalSystemBillNumber3: "",
                            BillCurrency: 2,
                            Language: 1,
                            RelatedCustomerId: "d215b447-7746-4865-b9fa-78e72a2f5678"
                       };

    var breakIfMerchantNeverBeenAuthorized = true;

    $("#result").html("");
    showProgress();

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createBill(breakIfMerchantNeverBeenAuthorized, billObject)
        .then(function (result){
            var _html = "<h4>BillId : </h4> " + result.BillId;
            hideProgress();
            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#listBills", function(){
    $("#result").html("");
    showProgress();

    var merchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var fromDateTime = "2021-02-16T13:45:00.000Z";
    var toDateTime = "2021-06-11T13:45:00.000Z";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.listBills(merchantId, fromDateTime, toDateTime)
        .then(function (result){
            var _html = "<table class='table'>";
            _html += "<thead><tr><th>Bill Id</th><th>Created Date</th><th>Merchant Id</th><th>Bill Title</th><th>Bill Description</th></tr></thead>";
            _html += "<tbody>";
            for(var i=0; i<result.Bills.length; i++)
            {
                _html += "<tr>";
                _html += "<td>" + JSON.stringify(result.Bills[i].BillId) + "</td>";
                _html += "<td>" + JSON.stringify(result.Bills[i].CreatedDate) + "</td>";
                _html += "<td>" + JSON.stringify(result.Bills[i].MerchantId) + "</td>";
                _html += "<td>" + JSON.stringify(result.Bills[i].BillTitle) + "</td>";
                _html += "<td>" + JSON.stringify(result.Bills[i].BillDescription) + "</td>";
                _html += "</tr>";
            }

            _html += "</tbody>";
            _html += "</table>";

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#getBill", function(){
    $("#result").html("");
    showProgress();

    var billId = "b13ab72f-b932-4345-9d15-aae7d3f7d134";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.getBill(billId)
        .then(function (result){
            var _html = "<table class='table'>";
            _html += "<thead><tr><th>Bill Id</th><th>Created Date</th><th>Merchant Id</th><th>Bill Title</th><th>Bill Description</th></tr></thead>";
            _html += "<tbody>";
            if(result.Bill != null)
            {
                _html += "<tr>";
                _html += "<td>" + JSON.stringify(result.Bill.BillId) + "</td>";
                _html += "<td>" + JSON.stringify(result.Bill.CreatedDate) + "</td>";
                _html += "<td>" + JSON.stringify(result.Bill.MerchantId) + "</td>";
                _html += "<td>" + JSON.stringify(result.Bill.BillTitle) + "</td>";
                _html += "<td>" + JSON.stringify(result.Bill.BillDescription) + "</td>";
                _html += "</tr>";
            }

            _html += "</tbody>";
            _html += "</table>";

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

$(document).on("click", "#deleteBill", function(){
    $("#result").html("");
    showProgress();

    var billId = "c4bfc007-abdc-4c0c-8b4d-5eafbd1f7c44";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.deleteBill(billId)
        .then(function (result){

            hideProgress();

            $("#result").html("billID : " + billId + " is Deleted");
        })
        .catch(reject);
    });
});

$(document).on("click", "#createPayement", function(){
    $("#result").html("");
    showProgress();

    var billId = "0ec1520e-7f5a-4367-8c7d-0d9684f689fe";
    var setPaymentCustomerFromBill = true;
    var paymentInfo =  {
                            PaymentFlow: 6,
                            RelatedCustomerId: "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee",
                            DueDate: "2021-05-09T16:10:19.000Z",
                            PaymentAmount: 1.22
                        };

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createPayment(billId, setPaymentCustomerFromBill, paymentInfo)
        .then(function (result){
            hideProgress();

            if(!result.HasError)
            {
                $("#result").html("PaymentId : " + result.PaymentId);
            }else{
                $("#result").html(result.Messages);
            }
           
        })
        .catch(reject);
    });
});

$(document).on("click", "#createDirectDeposit", function(){
    $("#result").html("");
    showProgress();

    var originMerchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var destinationAccount =  {
                                Owner: "Jeff Testing",
                                AccountName: "Personal bank account",
                                BankNumber: "003",
                                InstitutionNumber: "12345",
                                AccountNumber: "9876543"
                              };
    var depositDueDate = "2021-02-16T16:10:19.000Z";
    var currency = 1;
    var language = 1;
    var referenceNumber = "C12343-324";
    var amount = 200;

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createDirectDeposit(originMerchantId, destinationAccount, depositDueDate, currency, language, referenceNumber, amount)
        .then(function (result){
            hideProgress();

            if(!result.HasError)
            {
                $("#result").html("Direct Deposit Created");
            }else{
                $("#result").html(result.Messages);
            }
        })
        .catch(reject);
    });
});

$(document).on("click", "#createDirectInteracTransaction", function(){
    $("#result").html("");
    showProgress();

    var originMerchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var destinationAccount =   {
                                    "Description": "Interac Test",
                                    "Owner": "Kelly Interac",
                                    "TargetEmailAddress": "kinterac@dummytest.com",
                                    "TargetMobilePhoneNumber": "888-123-4567",
                                    "InteracQuestion": "Remember the fruit",
                                    "InteracAnswer": "Orange",
                                    "AccountName": "Personal bank account",
                                    "BankNumber": "003",
                                    "InstitutionNumber": "12345",
                                    "AccountNumber": "9876543"
                                };
    var depositDueDate = "2021-02-16T16:10:19.000Z";
    var currency = 1;
    var language = 1;
    var referenceNumber = "C12343-324";
    var amount = 200;

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createDirectInteracTransaction(originMerchantId, destinationAccount, depositDueDate, currency, language, referenceNumber, amount)
        .then(function (result){
            hideProgress();

            if(!result.HasError)
            {
                $("#result").html("Direct Interac Transaction Created");
            }else{
                $("#result").html(result.Messages);
            }
        })
        .catch(reject);
    });
});

$(document).on("click", "#createTransactionFromRaw", function(){
    $("#result").html("");
    showProgress();

    var merchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var rawAcpFileContent = "[THE ACP FILE CONTENT TEXT]";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createTransactionFromRaw(merchantId, rawAcpFileContent)
        .then(function (result){
            hideProgress();
            
            if(!result.HasError)
            {
                $("#result").html("Transaction From Raw Created");
            }else{
                $("#result").html(Messages);
            }
        })
        .catch(reject);
    });
});

$(document).on("click", "#createFreeOperation", function(){
    $("#result").html("");
    showProgress();

    var merchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var paymentMethodId = "e7d39476-ad6a-4549-8873-439c24712905";
    var transferType = 1;
    var referenceNumber = "C123-01312";
    var amount = 12.44;
    var language = 1;
    var transactionDueDate = "2021-02-16T16:10:19.000Z";
    var groupId = "HT123123";
    var transferFrequency = 0;

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.createFreeOperation(merchantId, paymentMethodId, transferType, referenceNumber, amount, language, transactionDueDate, groupId, transferFrequency)
        .then(function (result){
            hideProgress();
            
            if(!result.HasError)
            {
                $("#result").html("Free Operation Created");
            }else{
                $("#result").html(result.Messages);
            }
        })
        .catch(reject);
    });
});

$(document).on("click", "#deletePayment", function(){
    $("#result").html("");
    showProgress();

    var payementId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.deletePayment(payementId)
        .then(function (result){
            hideProgress();
            
            if(!result.HasError)
            {
                $("#result").html("Payement " + payementId + " deleted");
            }else{
                $("#result").html(result.Messages);
            }
        })
        .catch(reject);
    });
});

$(document).on("click", "#revertTransfer", function(){
    $("#result").html("");
    showProgress();

    var transferId = "c9a521d5-60a1-4398-8f6c-7462797d584c";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.revertTransfer(transferId)
        .then(function (result){
            hideProgress();
            
            if(!result.HasError)
            {
                $("#result").html("Transfer " + transferId + " reverted");
            }else{
                $("#result").html(result.Messages);
            }
        })
        .catch(reject);
    });
});

$(document).on("click", "#getRecuringTransfers", function(){
    $("#result").html("");
    showProgress();

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.getRecuringTransfers()
        .then(function (result){
            hideProgress();
            
            if(!result.HasError)
            {
                var _html = "<table class='table'>";
                _html += "<thead><tr><th>Recuring Transfer Id</th><th>Recuring Mode</th><th>Created Date</th><th>RelatedMerchantId</th><th>Related Customer Id</th><th>Amount</th></tr></thead>";
                _html += "<tbody>";

                if(!result.HasError)
                {
                    for(i=0; i < result.RecuringTransfers.length; i++)
                    {
                        _html += "<tr>";
                        _html += "<td>" + JSON.stringify(result.RecuringTransfers[i].RecuringTransferId) + "</td>";
                        _html += "<td>" + JSON.stringify(result.RecuringTransfers[i].RecuringMode) + "</td>";
                        _html += "<td>" + JSON.stringify(result.RecuringTransfers[i].CreatedDate) + "</td>";
                        _html += "<td>" + JSON.stringify(result.RecuringTransfers[i].RelatedMerchantId) + "</td>";
                        _html += "<td>" + JSON.stringify(result.RecuringTransfers[i].RelatedCustomerId) + "</td>";
                        _html += "<td>" + JSON.stringify(result.RecuringTransfers[i].Amount) + "</td>";
                        _html += "</tr>";
                    }
                }

                _html += "</tbody>";
                _html += "</table>";

                $("#result").html(_html);
            }else{
                $("#result").html(result.Messages);
            }

            hideProgress();
        })
        .catch(reject);
    });
});

$(document).on("click", "#deleteRecuringTransfer", function(){
    $("#result").html("");
    showProgress();

    var recuringTransferId = "89d720f2-78ae-4816-8fda-0099aa867c38";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.deleteRecuringTransfer(recuringTransferId)
        .then(function (result){
            hideProgress();
            
            if(!result.HasError)
            {
                $("#result").html("RecuringTransfer " + payementId + " deleted");
            }else{
                $("#result").html(result.Messages);
            }
        })
        .catch(reject);
    });
});

$(document).on("click", "#listExecutedOperations", function(){
    $("#result").html("");
    showProgress();

    var fromDate = "";
    var toDate = "";
    var transferType = "";
    var transferGroupId = ""; 
    var onlyWithErrors = "";
    var merchantId = "";
    var dateType = "";

    CryptoCaller.initialize("http://sandboxportal.tib.finance", serviceId, clientId, userName, password);

    new Promise(function(resolve, reject){
        ServerCaller.listExecutedOperations(fromDate, toDate, transferType, transferGroupId, 
                                            onlyWithErrors, merchantId, dateType)
        .then(function (result){
            return;
            var _html = "<table class='table'>";
            /*_html += "<thead><tr><th>Recuring Transfer Id</th><th>Recuring Mode</th><th>Created Date</th><th>Related Merchant Id</th><th>Related Customer Id</th><th>Amount</th></tr></thead>";
            _html += "<tbody>";
            for(var i=0; i<result.OperationList.length; i++)
            {
                _html += "<tr>";
                _html += "<td>" + JSON.stringify(result.OperationList[i].RecuringTransferId) + "</td>";
                _html += "<td>" + JSON.stringify(result.OperationList[i].RecuringMode) + "</td>";
                _html += "<td>" + JSON.stringify(result.OperationList[i].CreatedDate) + "</td>";
                _html += "<td>" + JSON.stringify(result.OperationList[i].RelatedMerchantId) + "</td>";
                _html += "<td>" + JSON.stringify(result.OperationList[i].RelatedCustomerId) + "</td>";
                _html += "<td>" + JSON.stringify(result.OperationList[i].Amount) + "</td>";
                _html += "</tr>";
            }

            _html += "</tbody>";
            _html += "</table>";*/

            hideProgress();

            $("#result").html(_html);
        })
        .catch(reject);
    });
});

function showProgress()
{
    var progressNumber = 0;

    $(".progress-bar").css("display", "inline");

    setInterval(function(){
        if(progressNumber <= 80)
        {
            progressNumber += 10;
            $(".progress-bar").css("width", progressNumber + "%");
            $(".progress-bar").attr("aria-valuenow", progressNumber);
        }else{
            return;
        }
    }, 120);
}

function hideProgress()
{
    var progressNumber = 100;
    $(".progress-bar").css("width", progressNumber + "%");
    $(".progress-bar").attr("aria-valuenow", progressNumber);

    setTimeout(() => { 
        $(".progress-bar").css("width", "0");
        $(".progress-bar").attr("aria-valuenow", 0);
        $(".progress-bar").css("display", "none"); 
    }, 500);
}