
# Methods

## List Of Methods

* #### Customers
	* {Create a customer}(#create-customer).
	* {List all service customers}(#list-all-service-customers).
	* {Get a customer detail}(#get-a-customer-detail).
	* {List the customers based on external identification}(#list-the-customers-based-on-external-identification).
	* {Modify an existing customer}(#modify-an-existing-customer).
	* {Delete a customer}(#delete-a-customer).

* #### Payment methods
	* {Create bank account payment method}(#create-bank-account-payment-method).
	* {Create credit card payment method}(#create-credit-card-payment-method).
	* {Create Interac payment method}(#create-Interac-payment-method).
	* {Change Interac Payment Method Question and Answer}(#change-Interac-Payment-Method-Question-and-Answer)
	* {Get a specific payment method}(#get-a-specific-payment-method).
	* {List payment methods}(#list-payment-methods)
	* {Change the default payment method of a customer}(#change-the-default-payment-method-of-a-customer).
	* {Delete payment method}(#delete-payment-method).
	
* #### Payments / Transfers
	* {Create Bill}(#create-bill).
	* {List Bill}(#list-bill).
	* {Get Bill}(#get-bill).
	* {Delete Bill}(#delete-bill).
	* {Create Payment}(#create-payment).
	* {Create Direct Deposit}(#create-direct-deposit).
	* {Create Interac Transfer}(#create-interac-transfer).
	* {Create from ACP File}(#create-from-acp-file).
	* {Create Free Operation}(#create-free-operation).
	* {Delete Transfer}(#delete-transfer).
	* {Revert Transfer}(#revert-transfer).
	* {List Recuring}(#list-recuring).
	* {Delete Recuring process}(#delete-recuring-process).
	* {Reporting of Operation}(#reporting-of-operation)
	* {List Executed Operations}(#list-executed-operations).
	* {List Transfers}(#list-transfers).
	* {List Transfers Fast}(#list-transfers-fast)
	* {List transfers For Bill Fast}(#list-transfers-for-bill-fast).

* #### Merchants
	* {Merchant basic information object}(#merchant-basic-information-object).
	* {Create new merchant}(#create-new-merchant).
	* {Get merchant info }(#get-merchant-info)
	* {Update merchant}(#update-merchant).
	* {Delete merchant}(#delete-merchant).
	* {Update merchant basic info}(#update-merchant-basic-info).
	* {Update merchant account info}(#update-Merchant-Account-Info).

* #### Whitelabeling (UI Looks)
	* {Set WhiteLabeling}(#set-whiteLabeling)
	* {Delete WhiteLabeling}(#delete-whiteLabeling)
	* {Get WhiteLabeling}(#get-whiteLabeling)
	* {Update WhiteLabeling Values}(#update-whiteLabeling-alues)
	* {Get List of WhiteLabeling (related Services/Merchants)}(#get-list-of-whiteLabeling)
	
* #### Clients
	* {sub-client}(#sub-client)
	* {Set client default service fee settings}(#set-client-default-service-fee-settings)
	* {Set client settings}(#set-client-settings)
	* {Get client settings}(#get-client-settings)
  
## Usage

In this document you'll see `sessionToken`  passed to every call for the sake of this document consider that the variable is declared Globaly and contains a fresh SessionToken.
Also For the context of this documentation `serviceId` contains an Id of an active service. and also declared Globaly.

## Customers Methods
` after you set up the api url and created a session you can start Using the Other Methods of the Sdk `

### Create customer
```
var customerName = ""; // customer Name
var customerExternalId = ""; //
var language = 1; // language Index From the language Enum
var customerDescription = ""; // customer description.

serverCaller.createCustomer(customerName, customerExternalId, language, customerDescription, serviceId, sessionToken).then().catch();
        
```

### List all service customers
```
var serviceId = "";  // the service to get the list from 
serverCaller.listCustomers(serviceId, sessionToken).then().catch();
```

### Get a customer detail
```
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";
serverCaller.getCustomer(customerId,sessionToken).then().catch();
```

### List the customers based on external identification
``` 
var customerExternalId = "C132-344"; // customer ExternalId
serverCaller.getCustomersByExternalId(customerExternalId, sessionToken).then().catch();     
```

### Modify an existing customer
```
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd"; // customer Id to update.
var customerName = "new value";
var customerExternalId = "new Value";
var language = 1;
var customerDescription = "new Value";

serverCaller.saveCustomer(customerId, customerName, customerExternalId, language, customerDescription, ssessionToken);
        
```

### Delete a customer
```
var customerId = "dc09fbbf-4067-4b21-af09-81707fd227a6"; 

serverCaller.deleteCustomer(customerId, sessionToken);
```

## Payment methods

### Create bank account payment method

```
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";
var isCustomerAutomaticPaymentMethod = true;
var type = "Account";
var account = serverCaller.createBankAccountObject("Customer 200", "Personal bank account", "003", "12345", "98765432");

serverCaller.createDirectAccountPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, account, sessionToken);

```

### Create credit card payment method
```
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";
var isCustomerAutomaticPaymentMethod = true;
var type = "CreditCard";
var creditCard = serverCaller.createCreditCardObject("4242424242424242", "123", "12", "24", "Test Card", "Johny Cardholder", "1 Testing road", "Testcity", "10", "1", "H1H1H1"); 

serverCaller.createDirectAccountPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, creditCard, sessionToken);
        
```


### Create Interac payment method

``` 
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";
var isCustomerAutomaticPaymentMethod = true;
var type = "Interac";

var InteracInformation = serverCaller.createInteracObject("Interac Test", "Kelly interac", "kinterac@dummytest.com", "8881234567","Remember the fruit", "8881234567") 

serverCaller.createDirectAccountPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, InteracInformation, sessionToken);
```

### Change Interac Payment Method Question and Answer
``` 
var id = "";
var question = "new Question";
var answer = "new answer ";
serverCaller.ChangeInteracPaymentMethodQuestionAndAnswer(id, question, answer, sessionToken);
           
```

### Get a specific payment method
```
var paymentId = "5397c23a-e938-47c5-94f8-c2d821959ec5";

serverCaller.getPaymentMethod(paymentId, sessionToken);
```

### List payment methods
```
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";
serverCaller.listPaymentMethods(customerId, sessionToken);
```

### Change the default payment method of a customer
```
var paymentMethodId = "5397c23a-e938-47c5-94f8-c2d821959ec5";
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";


serverCaller.setDefaultPaymentMethod(paymentMethodId, customerId,sessionToken);
```

### Delete payment method
```
var paymentMethodId = "5397c23a-e938-47c5-94f8-c2d821959ec5";

serverCaller.deletePaymentMethod(paymentMethodId,sessionToken);
```

## Bills / Payments / Transfers

### Create Bill
```
var breakIfMerchantNeverBeenAuthorized = true;
var billData = {
	MerchantId: merchantId,
	BillTitle: "test interac",
	BillDescription: "test interac",
	BillAmount: 1,
	ExternalSystemBillNumber1: "",
	ExternalSystemBillNumber2: "",
	ExternalSystemBillNumber3: "",
	BillCurrency: 2,
	Language: 1,
	RelatedCustomerId: "bf199033-53a1-48cd-8f17-04254d026ecd"
};

serverCaller.createBill(breakIfMerchantNeverBeenAuthorized, billData,sessionToken);
```

### List Bills

```
var fromDateTime = "2021-02-16T13:45:00.000Z";
var toDateTime = "2021-05-16T13:45:00.000Z";

serverCaller.listBills(merchantId, fromDateTime, toDateTime,sessionToken);

```

### Get Bill

```
var billId = "b2678654-9eec-4a6e-aeaa-8d0893b2a986";

serverCaller.getBill(billId,sessionToken);
```

### Delete Bill
```
var billId = "0ec1520e-7f5a-4367-8c7d-0d9684f689fe";

serverCaller.deleteBill(billId,sessionToken);
```
*Keep in mind that you'll have to implement your own verification logic to avoid deleting a bill by mistake*

### Create Payment

```
var billId = "3c7792af-f377-48ba-b3f1-0474f6eab127";
var setPaymentCustomerFromBill = false;
var paymentInfo = {
	PaymentFlow: 6,
	RelatedCustomerId: "d215b447-7746-4865-b9fa-78e72a2f5678",
	DueDate: "2021-05-10T16:10:19.000Z",
	PaymentAmount: 1.22};

serverCaller.createPayement(billId, setPaymentCustomerFromBill, paymentInfo,sessionToken,sessionToken);
```

### Create Direct Deposit (this Methods is obsolete, Use CreateFreeOperation) 
```
var originMerchantId = merchantId;
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
var amount = 1.22;
var referenceNumber = "C12343-324";

serverCaller.createDirectDeposit(originMerchantId, destinationAccount, depositDueDate, currency, language, amount, referenceNumber,sessionToken);
```

### Create Interac Transfer

```
var originMerchantId = merchantId;
var interacInformation = serverCaller.create
var depositDueDate = "2021-02-16T16:10:19.000Z";
var currency = 1;
var language = 1;
var amount = 1.22;
var referenceNumber = "C12343-324";

serverCaller.createDirectDeposit(originMerchantId, interacInformation, depositDueDate, currency, language, amount, referenceNumber,sessionToken);
```
### Create from ACP file
```
var rawAcpFileContent = "";
serverCaller.createTransactionFromRaw(merchantId, rawAcpFileContent, sessionToken);
```
### Create Free Operation
```
var paymentMethodId = "03c415fd-5f64-4678-a388-39facbb2bee1";
var transferType = 1;
var referenceNumber = "C123-01312";
var amount = 1.22;
var language = 1;
var transactionDueDate = "2021-05-12T16:10:19.000Z";
var groupId = "HT123123";
var transferFrequency = 0;

serverCaller.createFreeOperation(merchantId, paymentMethodId, transferType, referenceNumber, amount, language, transactionDueDate, groupId, transferFrequency,sessionToken);
```
### Delete Transfer
```
var paymentId = "03c415fd-5f64-4678-a388-39facbb2bee1";

serverCaller.deletePayment(paymentId,sessionToken);
```
### Revert Transfer
```
var transferId = "c9a521d5-60a1-4398-8f6c-7462797d584c";

serverCaller.revertTransfer(transferId,sessionToken);
```
### List Recuring
```
serverCaller.getRecuringTransfers(serviceId,sessionToken);
```

### Delete Recuring process
```
var recuringTransferId = "89d720f2-78ae-4816-8fda-0099aa867c38";

serverCaller.deleteRecuringTransfer(recuringTransferId,sessionToken);
```

## Reporting of Operation

### List Executed Operations
```
var fromDate = "";
var toDate = "";
var transferType = "";
var transferGroupId = "";
var onlyWithErrors = "";
var merchantId = "";
var dateType = "";

serverCaller.listExecutedOperations(fromDate, toDate, transferType, transferGroupId, onlyWithErrors, merchantId, dateType, sessionToken);

```
### List Transfers
```
 	var from = new DateTime(""); 
	var to = new DateTime(""); 
	var exGroupId = ""; 
	var lvlFilterId = ""; 
	var markResolvedOnly = false;
	var paymentFilterLvl = 2 ;// this Ranges from 1 to ...
	var transferType = 1 ;// this Ranges from 1 to 7
	var transferGroupId  = "" ; 
	var onlywithErrors = false;
	serverCaller.ListTransfers(sessionToken, from, to, exGroupId, lvlFilterId, markResolvedOnly,paymentFilterLvl, transferType, transferGroupId, onlywithErrors);
```

### List Transfers Fast
```
	var from = new DateTime(""); 
	var to = new DateTime(""); 
	var exGroupId = ""; 
	var merchantId = ""; 
	var markResolvedOnly = false;
	var transferType = 1 ;// this Ranges from 1 to 6 and is different From the Enum used in ListTransfers (List Transfers Uses TransferTypeFlags and This Uses TransferTypeEnum.)
	var transferGroupId  = "" ; 
	var onlywithErrors = false;
	serverCaller.ListTransfersFast(sessionToken, merchantId, from, to, exGroupId, markResolvedOnly, transferType, transferGroupId, onlywithErrors);

```

### List transfers For Bill Fast
```
	var merchantId = ""; 
	var bill = ""; 
	serverCaller.ListTransfersForBillFast(sessionToken, merchantId, billId);
```


## Merchant Methods

### Create new merchant
```
var merchantInfo = {
	EmailCopyTos: "",
	ExternalSystemIds: "",
	Emails: "",
	FavoriteProviders: 0,
	Languages: 0,
	MerchantCurrencys: 0,
	MerchantDescriptions: "",
	MerchantNames: "",
	PhoneNumbers: "",
	ExternalSystemGroupIds: "",
	Addresss: {
		AddressCitys: "",
		CountryIds: 0,
		PostalZipCodes: "",
		ProvinceStateIds: 0,
		StreetAddresss: ""
	},
	Accounts: {
		AccountNames: "",
		AccountNumbers: "",
		BankNumbers: "",
		CheckDigits: "",
		InstitutionNumbers: "",
		Owners: ""
	},
}; 
serverCaller.CreateMerchant(merchantInfo, sessionToken, serviceId);
```
### Get merchant info
``` 
var erchantId = ""; 
serverCaller.GetMerchant(merchantId, sessionToken);
```
### Update merchant
``` 
var merchantId = ""; 
var merchantInfo = {
	MerchantName: "",
	ExternalSystemId: "",
	ExternalSystemGroupId: "",
	MerchantCurrency: "",
	Language: "",
	Email: "",
	EmailCopyTo: "",
	PhoneNumber: "",
	MerchantDescription: "",
	Address: {    
		StreetAddress: "",
		AddressCity: "",
		ProvinceStateId: 1,
		CountryId: 1,
		PostalZipCode: "",
	},
	FavoriteProvider: "",
	Account: {
		AccountName: "",
		Owner: "",
		BankNumber: "",
		InstitutionNumber: "",
		AccountNumber: "",
		CheckDigit: "",
		FullAccountNumber: "",
		AccountNumberWithCheckDigit: "",
		PreviewString: "",
	},
}; 

serverCaller.SaveMerchant(merchantId, merchantInfo, sessionToken);
```
### Delete merchant
```
var merchantId  = ""
serverCaller.deleteMerchant(merchantId, sessionToken);
```
### Update merchant basic info 
```
var merchantId = ""; 
var merchantInfo = {
	MerchantName: "",
	ExternalSystemId: "",
	ExternalSystemGroupId: "",
	MerchantCurrency: "",
	Language: "",
	Email: "",
	EmailCopyTo: "",
	PhoneNumber: "",
	MerchantDescription: "",
	Address: {    
		StreetAddress: "",
		AddressCity: "",
		ProvinceStateId: 1,
		CountryId: 1,
		PostalZipCode: "",
	},
	FavoriteProvider: ""
};
sserverCaller.SaveMerchantBasicInfo(merchantId, merchantInfo, sessionToken);
```
### Update merchant account info

```
var merchantId = ""; 
var merchantInfo = {
	Account: {
		AccountName: "",
		Owner: "",
		BankNumber: "",
		InstitutionNumber: "",
		AccountNumber: "",
		CheckDigit: "",
		FullAccountNumber: "",
		AccountNumberWithCheckDigit: "",
		PreviewString: "",
	},
};

serverCaller.SaveMerchantAccountInfo(merchantId, merchantInfo, sessionToken);
```

## Whitelabeling (UI Looks)

The Whitelabeling can be set on multiple levels 

* Client
* Service
* Merchant

please See {whitelabeling levels enums}(../README.md#WhiteLabeling-levels-enum)

The WhiteLabeling Use 2 main Objects `WhiteLabelingModel` and `WhiteLabelingDataModel`

The first is a container of white labeling Values for a single entity (client, service, merchant) and have a list of `WhiteLabelingDataModel`.

The Second one represents the values that a single whitelabeling cssProperty going to have.

*Note: To Chenge the logo the api accepts images as a base64 string so you will need to implement your own imageToBase64 and the pass the string to the api.*

The WhiteLabeling only support a number of parameters 

This is the list o f the properties that you can customize 
```
"company-name"
"logo-secound-part-color"
"logo-first-Part-color"
"logo-background"
"radio-button-color"
"checbox-color"
"sidenav-item-active-color"
"sidenav-button-trigger-color"
"button-color"
"logo"
"accepte-button-color"
"reject-button-color"
"navbar-backgournd-color"
"icon-size"
"title-font-family"
"title-font-size"
"subtitle-font-family"
"subtitle-font-size"
"subtitle-text-color"
```
you pass one of those to the cssProperty and pass the value you want it to be.

### Set WhiteLabeling
```
var id = clientId;  // entity Id ; 
var level = 3; // entity level; 
var whiteLabelingData = {
	{
		CssPropery: "logo",
		CssValue: "base64string"
	},
	{
		CssPropery: "button-color",
		CssValue: "red"
	},
};
serverCaller.SetwhiteLabeling(id, level, whiteLabelingData,sessionToken);
```
### Delete WhiteLabeling

```
var id = clientId;  // entity Id ; 
var level = 3; // entity level; 
serverCaller.DeleteWhiteLabelingData(id, level,sessionToken);
```

### Get WhiteLabeling
```
var id = clientId;  // entity Id ; 
var level = 3; // entity level; 
serverCaller.GetwhiteLabeling(id, level,sessionToken);
```

### Update WhiteLabeling Values

```
var id = clientId;  // entity Id ; 
var level = 3; // entity level; 
var updateWhiteLabelingData = {
	{
		Id: "", // required for update;
		CssPropery: "....",
		CssValue: "...."
	},
	{
		Id: "",
		CssPropery: "....",
		CssValue: "...."
	},
	{
		Id: "",
		CssPropery: "....",
		CssValue: "...."
	},
};
serverCaller.UpdateWhiteLabelingData(id, level, updateWhiteLabelingData,sessionToken);
```

### Get List of WhiteLabeling
```
serverCaller.GetListWhiteLabelingData(sessionToken);
```

## Clients
### sub-client
```
var name = "new sub Client";
var language = 2;
serverCaller.CreateSubClient(name, language,sessionToken);
```
### Set client default service fee settings
```
var clientId = clientId;
var ServiceFeeSettings = {
	ConvenientFeeDebitAbsoluteFee: 0,
	ConvenientFeeCreditAbsoluteFee: 0,
};
serverCaller.SetClientDefaultServiceFeeSettings(clientId, ServiceFeeSettings,sessionToken);
```
### Set client settings
```
var clientId = clientId;
var clientSettings = {
	CollectionLimitDaily: 93849,
	DepositLimitDaily: 2994949
};
serverCaller.SetClientSettings(clientId, clientSettings,sessionToken);
```
### Get client settings

```
var clientId = clientId;
serverCaller.GetClientSettings(clientId,sessionToken);
```
