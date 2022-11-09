/***************
 * Exemple d'utilisation de API TIB FINANCE SDK
 */

var serviceId = "038D7171-BF23-4F3C-9E78-CF6342624FC7";
var clientId = "4671a4c9-4367-4934-bb23-a8886cebd028";
var userName = "sdkdev";
var password = "Test123!"
var merchantId = "";
var sessionToken = "";

var serverCaller = new ServerCaller()

class HtmlHelper {
    SetTableHeader = function (obj) {
        let titles = "";
        let keys = Object.keys(obj);
        keys.forEach((elem) => {
            titles += `<th>${elem}</th>`;
        });
        return `<table border='1' style='text-align: center;'><thead>${titles}</thead><tbody>`;
    };
    SetListInTable = function (dataValues) {
        if (dataValues.length == 0) {
            return "No Items ";
        }
        let table = this.SetTableHeader(dataValues[0]);
        let values = "";
        dataValues.forEach((elm) => {
            values += "<tr>";
            for (const [key, value] of Object.entries(elm)) {
                if (typeof value === "object") {
                    if (value === null) {
                        values += `<td>${value}</td>`
                    } else if (Array.isArray(value)) {
                        values += `<td>${this.SetListInTable(value)}</td>`
                    } else {
                        values += `<td>${this.SetObjectInTable(value)}</td>`
                    }
                } else {
                    values += `<td>${value}</td>`;
                }
            }
            values += "</tr>";
        });
        table += values;
        table += this.SetTableFooter();
        return table;
    };
    SetObjectInTable = function (obj) {
        let table = this.SetTableHeader(obj);
        let values = "";
        values += "<tr>";
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === "object") {
                if (value === null) {
                    values += `<td>${value}</td>`
                } else if (Array.isArray(value)) {
                    values += `<td>${this.SetListInTable(value)}</td>`
                } else {
                    values += `<td>${this.SetObjectInTable(value)}</td>`
                }
            } else {
                values += `<td>${value}</td>`;
            }

        }
        values += "</tr>";
        table += values;
        table += this.SetTableFooter();
        return table;
    };
    SetTableFooter = function () {
        return "</tbody></table>";
    };
}
class ResultHandler {
    constructor() {
        this.htmlHelper = new HtmlHelper();
        this.htmlContent = "";
    }
    Handle(resObj, exprectedResult, message = "") {
        if (!resObj.HasError) {
            if (Array.isArray(exprectedResult)) {
                this.htmlContent = this.htmlHelper.SetListInTable(exprectedResult);
            } else {
                // in the case you want to show a custom message pass a make `expectedResult = null` resultHandler.Handle(result, null, "your Custom Message")
                if (exprectedResult == null || exprectedResult == undefined) {
                    this.htmlContent = message
                } else {
                    this.htmlContent = this.htmlHelper.SetObjectInTable(exprectedResult);
                }
            }
            return true;
        } else {
            if (resObj.Messages.includes("Need an authenticated user to perform this action") || resObj.Messages.includes("Call received with no session token")) {
                alert("need to authenticate to perform this call.")
            } else {
                alert(resObj.Messages)
            }
        }
        return false;
    }
    getHtmlContent() {
        return this.htmlContent;
    }

}

let htmlHelper = new HtmlHelper();
let resultHandler = new ResultHandler();
$(document).ready(function () {
    serverCaller.initalize("http://sandboxportal.tib.finance");

});

$(document).on("click", "#createSession", function () {
    var data = {
        "Customer": {
            "CustomerName": "new Customer",
            "CustomerExternalId": "c123-59",
            "Language": "1",
            "CustomerDescription": "VIP Customer"
        }
    };

    $("#result").html("");
    showProgress();

    var name = "Customer 100";
    var externalId = "1122ZEE";
    var language = 1;
    var description = "Customer created from new JS SDK methods";


    new Promise(function (resolve, reject) {
        serverCaller.createSession(clientId, userName, password)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Session Created : " + result.SessionId)) {                    
                    sessionToken = result.SessionId;
                    $("#result").html(resultHandler.getHtmlContent())
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#addCustomer", function () {
   
    $("#result").html("");
    showProgress();

    var name = "Customer 5000";
    var externalId = "1122ZEE";
    var language = 1;
    var description = "Customer created from new JS SDK methods";

    new Promise(function (resolve, reject) {
        serverCaller.createCustomer(name, externalId, language, description, serviceId, sessionToken)
            .then(function (result) {

                if (resultHandler.Handle(result, null, "<h4>Customer Id  :<br/> </h4>" + result.CustomerId)) {
                    $("#result").html(resultHandler.getHtmlContent())
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#listCustomer", function () {

    $("#result").html("");
    showProgress();
    new Promise(function (resolve, reject) {
        serverCaller.listCustomers(serviceId, sessionToken)
            .then(function (result) {

                if (resultHandler.Handle(result, result.Customers)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();

            })
            .catch(reject);
    });
});

$(document).on("click", "#getOneCustomer", function () {
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";

    new Promise(function (resolve, reject) {
        serverCaller.getCustomer(customerId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.Customer)) {
                    $("#result").html(resultHandler.getHtmlContent())
                }
                hideProgress();

            })
            .catch(reject);
    });
});

$(document).on("click", "#getCustomerByExternalId", function () {
    $("#result").html("");
    showProgress();

    var customerExternalId = "1122ZEE";

    new Promise(function (resolve, reject) {
        serverCaller.getCustomersByExternalId(customerExternalId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.Customers)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#saveCustomer", function () {
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var customerName = "Customer 100 updated with JS SDK";
    var externalId = "1122ZEE";
    var language = 2;
    var customerDescription = "Customer updated from new JS SDK methods";

    new Promise(function (resolve, reject) {
        serverCaller.saveCustomer(customerId, customerName, externalId, language, customerDescription, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Success")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#deleteCustomer", function () {
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";

    new Promise(function (resolve, reject) {
        serverCaller.deleteCustomer(customerId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Deleted Success")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#directAccountPaymentMethod", function () {
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var isCustomerAutomaticPaymentMethod = true;
    var account = serverCaller.createBankAccountObject("Jeff Testing", "Personal bank account", "003", "12345", "9876543");

    new Promise(function (resolve, reject) {
        serverCaller.createDirectAccountPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, account, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Created")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#creditCardPaiementMethode", function () {
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var isCustomerAutomaticPaymentMethod = true;
    var CreditCard = serverCaller.createCreditCardObject("4242424242424242", "123", "12", "24", "Test Card", "Johny Cardholder", "1 Testing road", "Testcity", "10", "1", "H1H1H1");

    new Promise(function (resolve, reject) {
        serverCaller.createCreditCardPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, CreditCard, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Created")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();

            })
            .catch(reject);
    });
});

$(document).on("click", "#interacPaiementMethode", function () {
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var isCustomerAutomaticPaymentMethod = true;
    var InteracInformation = serverCaller.createInteracObject("Interac Test", "Kelly Interac", "kinterac@dummytest.com", "8881234567", "Remember the fruit", "Orange");

    new Promise(function (resolve, reject) {
        serverCaller.createInteracPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, InteracInformation, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "<h4>PaymentMethodId : </h4> " + result.PaymentMethodId)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#getPayementMethod", function () {
    $("#result").html("");
    showProgress();

    var paymentMethodId = " b1d3ca2c-8c04-4c03-8de4-7a5f464198e2";

    new Promise(function (resolve, reject) {
        serverCaller.getPaymentMethod(paymentMethodId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.PaymentMethod, "")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#listPayementMethods", function () {
    $("#result").html("");
    showProgress();

    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";

    new Promise(function (resolve, reject) {
        serverCaller.listPaymentMethods(customerId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.PaymentMethods, "")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#setDefaultPaymentMethod", function () {
    $("#result").html("");
    showProgress();
    var customerId = "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee";
    var payementMethodId = "b1d3ca2c-8c04-4c03-8de4-7a5f464198e2";

    new Promise(function (resolve, reject) {
        serverCaller.setDefaultPaymentMethod(payementMethodId, customerId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Set")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();

            })
            .catch(reject);
    });
});

$(document).on("click", "#deletePaymentMethod", function () {
    $("#result").html("");
    showProgress();

    var payementMethodId = "0ce18bb1-5fef-40f1-892f-828a1fc21b97";

    new Promise(function (resolve, reject) {
        serverCaller.deletePaymentMethod(payementMethodId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "deleted")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#listWhiteLabeling", function () {
    $("#result").html("");
    showProgress();
    new Promise(function (resolve, reject) {
        serverCaller.getListWhiteLabelingData(sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.whiteLabelings)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();

            })
            .catch(reject);
    });
});

$(document).on("click", "#createBill", function () {
    var billObject = {
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

    new Promise(function (resolve, reject) {
        serverCaller.createBill(breakIfMerchantNeverBeenAuthorized, billObject, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "<h4>BillId : </h4> " + result.BillId)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#listBills", function () {
    $("#result").html("");
    showProgress();

    var merchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var fromDateTime = "2021-02-16T13:45:00.000Z";
    var toDateTime = "2021-06-11T13:45:00.000Z";

    new Promise(function (resolve, reject) {
        serverCaller.listBills(merchantId, serviceId, fromDateTime, toDateTime, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.Bills)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }

                hideProgress();

            })
            .catch(reject);
    });
});

$(document).on("click", "#getBill", function () {
    $("#result").html("");
    showProgress();

    var billId = "b13ab72f-b932-4345-9d15-aae7d3f7d134";


    new Promise(function (resolve, reject) {
        serverCaller.getBill(billId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.Bill)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();

            })
            .catch(reject);
    });
});

$(document).on("click", "#deleteBill", function () {
    $("#result").html("");
    showProgress();

    var billId = "c4bfc007-abdc-4c0c-8b4d-5eafbd1f7c44";

    new Promise(function (resolve, reject) {
        serverCaller.deleteBill(billId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "billID : " + billId + " is Deleted")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();

            })
            .catch(reject);
    });
});

$(document).on("click", "#createPayement", function () {
    $("#result").html("");
    showProgress();

    var billId = "1bb24c7e-3543-47da-8df4-396b14c035a4";
    var setPaymentCustomerFromBill = true;
    var paymentInfo = {
        PaymentFlow: 6,
        RelatedCustomerId: "3004c5df-9f6d-4ae6-b5ee-c30ef8b845ee",
        DueDate: "2021-05-09T16:10:19.000Z",
        PaymentAmount: 1.22
    };

    new Promise(function (resolve, reject) {
        serverCaller.createPayment(billId, setPaymentCustomerFromBill, "customerEmail@gmail.com", paymentInfo, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, null, "billID : " + result.PaymentId + " is Deleted")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
            })
            .catch(reject);
    });
});

$(document).on("click", "#createDirectDeposit", function () {
    $("#result").html("");
    showProgress();

    var originMerchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var destinationAccount = {
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

    new Promise(function (resolve, reject) {
        serverCaller.createDirectDeposit(originMerchantId, destinationAccount, depositDueDate, currency, language, referenceNumber, amount, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, null, "Direct Deposit Created")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
            })
            .catch(reject);
    });
});

$(document).on("click", "#createDirectInteracTransaction", function () {
    $("#result").html("");
    showProgress();

    var originMerchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var destinationAccount = {
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

    new Promise(function (resolve, reject) {
        serverCaller.createDirectInteracTransaction(originMerchantId, destinationAccount, depositDueDate, currency, language, referenceNumber, amount, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, null, "Direct Interac Transaction Created")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
            })
            .catch(reject);
    });
});

$(document).on("click", "#createTransactionFromRaw", function () {
    $("#result").html("");
    showProgress();
    var merchantId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    var rawAcpFileContent = "[THE ACP FILE CONTENT TEXT]";

    new Promise(function (resolve, reject) {
        serverCaller.createTransactionFromRaw(merchantId, rawAcpFileContent, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, null, "Transaction From Raw Created")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
            })
            .catch(reject);
    });
});

$(document).on("click", "#createFreeOperation", function () {
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

    new Promise(function (resolve, reject) {
        serverCaller.createFreeOperation(merchantId, paymentMethodId, transferType, referenceNumber, amount, language, transactionDueDate, groupId, transferFrequency, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, null, "Free Operation Created")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }

            })
            .catch(reject);
    });
});

$(document).on("click", "#deletePayment", function () {
    $("#result").html("");
    showProgress();
    var payementId = "ea34f2c6-36b2-4513-973e-a2c91e7985d3";
    new Promise(function (resolve, reject) {
        serverCaller.deletePayment(payementId, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, null, "Payement " + payementId + " deleted")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
            })
            .catch(reject);
    });
});

$(document).on("click", "#revertTransfer", function () {
    $("#result").html("");
    showProgress();

    var transferId = "c9a521d5-60a1-4398-8f6c-7462797d584c";


    new Promise(function (resolve, reject) {
        serverCaller.revertTransfer(transferId, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, null, "Transfer " + transferId + " reverted")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
            })
            .catch(reject);
    });
});

$(document).on("click", "#getRecuringTransfers", function () {
    $("#result").html("");
    showProgress();
    new Promise(function (resolve, reject) {
        serverCaller.getRecuringTransfers(serviceId, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, result.RecuringTransfers, "Transfer " + transferId + " reverted")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#deleteRecuringTransfer", function () {
    $("#result").html("");
    showProgress();

    var recuringTransferId = "";
    new Promise(function (resolve, reject) {
        serverCaller.deleteRecuringTransfer(recuringTransferId, sessionToken)
            .then(function (result) {
                hideProgress();
                if (resultHandler.Handle(result, null, "RecuringTransfer " + payementId + " deleted")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
            })
            .catch(reject);
    });
});

$(document).on("click", "#listExecutedOperations", function () {
    $("#result").html("");
    showProgress();
    var fromDate = "";
    var toDate = "";
    var transferType = 1;
    var transferGroupId = "";
    var onlyWithErrors = false;
    var merchantId = "";
    var dateType = "";

    new Promise(function (resolve, reject) {
        serverCaller.listExecutedOperations(fromDate, toDate, transferType, transferGroupId,
                onlyWithErrors, merchantId, dateType, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.OperationList)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#getWhiteLabeling", function () {
    $("#result").html("");
    showProgress();
    new Promise(function (resolve, reject) {
        serverCaller.getWhiteLabelingData(clientId, 3, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.WhiteLabeling)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#setWhiteLabeling", function () {
    $("#result").html("");
    showProgress();

    var whiteLabelingData = [{
            CssProperty: "background-color",
            CssValue: "magenta"
        },
        {
            CssProperty: "button-color",
            CssValue: "red"
        },
    ];
    new Promise(function (resolve, reject) {
        serverCaller.setwhiteLabeling(clientId, 3, whiteLabelingData, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Added successfully")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});
$(document).on("click", "#listServices", function () {
    $("#result").html("");
    showProgress();

    new Promise(function (resolve, reject) {
        serverCaller.listServices(merchantId, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, result.Services, "Added successfully")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#updateWhiteLabeling", function () {
    $("#result").html("");
    showProgress();
    var whiteLabelingData = [{
        WhiteLabelingDataId: "9bc7a671-704d-441f-a906-3b2a44dbc3e5",
        CssProperty: "background-color",
        CssValue: "yellow"
    }];
    new Promise(function (resolve, reject) {
        serverCaller.updateWhiteLabelingData(clientId, 3, whiteLabelingData, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Updated successfully")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});
$(document).on("click", "#deleteWhiteLabeling", function () {
    $("#result").html("");
    showProgress();

    new Promise(function (resolve, reject) {
        serverCaller.deleteWhiteLabeling(clientId, 3, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "Deleted successfully")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});



$(document).on("click", "#createsubclient", function () {
    $("#result").html("");
    showProgress();
    new Promise(function (resolve, reject) {
        serverCaller.createSubClient("new subClient", 2, sessionToken)
            .then(function (result) {
                if (resultHandler.Handle(result, null, "added successfully")) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
});

$(document).on("click", "#getService", function () {
    $("#result").html("");
    showProgress();

    new Promise(function (resolve, reject) {
        serverCaller.getService(serviceId, sessionToken)
            .then(function (result) {
                console.log(result)
                if (resultHandler.Handle(result, result.Service)) {
                    $("#result").html(resultHandler.getHtmlContent());
                }
                hideProgress();
            })
            .catch(reject);
    });
})

function showProgress() {
    var progressNumber = 0;

    $(".progress-bar").css("display", "inline");

    setInterval(function () {
        if (progressNumber <= 80) {
            progressNumber += 10;
            $(".progress-bar").css("width", progressNumber + "%");
            $(".progress-bar").attr("aria-valuenow", progressNumber);
        } else {
            return;
        }
    }, 120);
}

function hideProgress() {
    var progressNumber = 100;
    $(".progress-bar").css("width", progressNumber + "%");
    $(".progress-bar").attr("aria-valuenow", progressNumber);

    setTimeout(() => {
        $(".progress-bar").css("width", "0");
        $(".progress-bar").attr("aria-valuenow", 0);
        $(".progress-bar").css("display", "none");
    }, 500);
}