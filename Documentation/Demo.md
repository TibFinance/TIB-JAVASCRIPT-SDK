# Demo

After You're done wwith the Set up where you initialized the Api Url, you would want to try if our Api Works.

This demo is going to walk you though how to create a payment step by step 

By the end of this demo you'll have an understanding of what are `customer`, `Merchant`, `different payment Methods`, `Bills` ...

Keep in mind that each call returns a promise 

## Get the session token

First and foremost you'll need to have a session token to be able to make calls to the api via the sdk

*The client ID is required for the session creation call. This identification is provided by TIB during the account opening*
```
	var clientId = ""; // the Client Id. 
	var userName = ""; // a username
	var password = ""; /: a password

	serverCaller.createSession(clientId, userName, password).then(function (result ){
		// your logic for storing Session Id result.SesisonToken
	})
	.catch(reject)
```
*'response.SessionId' is required in every SDK method*

## Create merchant account

By default when Opening the Client Account TibFinance Created a primary merchant Account .

But you Can Create a merchant account with the Api, first understand that the Merchant Account has 2 concepts: **Basic Information** and **Account Information**:

The Following Code Show the MerchantModel object

```
var merchantInfo = {

	EmailCopyTo : "",
	ExternalSystemId : "",
	Email : "",
	FavoriteProvider : 0,
	Language : 0,
	MerchantCurrency : 0,
	MerchantDescription : "",
	MerchantName : "",
	PhoneNumber : "",
	ExternalSystemGroupId : "",
	Address : {
		AddressCity : "",
		CountryId : 0,
		PostalZipCode : "",
		ProvinceStateId : 0,
		StreetAddress : ""
	},
	Account : [
		AccountName : "",
		AccountNumber : "",
		BankNumber : "",
		CheckDigit : "",
		InstitutionNumber : "",
		Owner : ""
	],
};
	

```

*NOTE The MerchantModel inherits from MerchantModelBasicInfo so the MerchantModel includes both concepts.*

After filling out the correct information for the merchant creationg you'll need to pass the object to the CreateMerchant Method :

```
serverCaller.CreateMerchant(merchantInfo, sessionToken, serviceId)
.then(function (result) {
	// logic for the Case of successfuly created Merchant.
})
.catch(reject);
```
*Save the merchant Id to use it Later when creating bills*
 

## Create Customer

Customers are the clients of the merchants. They are the one the merchant collect money from, or the one the merchant deposit money to.

The customer is only a container object that identify the entity of a person. This object will then have payment methods attached to it for the account information. The customer ID needs to be used when transmitting payment on the API.


The Following Code Shows the Customer information 
```
let customerName = "Customer 200";
let customerExternalId = "C132-344";
let language = 1;
let customerDescription = "Customer created from new PHP SDK";

```

This code is the args to create a customer
```
serverCaller.createCustomer(customerName, customerExternalId, language, customerDescription, serviceId, sessionToken)
.then(function (result) {
	//
})
.catch(reject);
```

## Creating Payment Methods

The payment methods are financial accounts Link it to a customer. A customer can have multiple payment methods. All payment methods have a unique identifier.

This section Explains how to create a payment method and attache it to a customer with the Api.

Currently the TibFinance Supports 3 payment Method Types:

* Credit card
* Bank account
* Interac 


#### Credit card

Credit card payment method allow the merchant to collect money from the customer’s credit card.

*NOTE The credit card payment method cannot be used during deposit.*

The Following code is the Arguments for creating Create Credit Card Payment method and the call that Creates the Credit Card paymemnt Method.
```

var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";
var isCustomerAutomaticPaymentMethod = true;

var creditCard = serverCaller.createCreditCardObject("4242424242424242", "123", "12", "24", "Test Card", "Johny Cardholder", "1 Testing road", "Testcity", "10", "1", "H1H1H1");

serverCaller.createCreditCardPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, creditCard, sessionToken)
.then( function(resutl){
	//
})
.catch(reject)

```

#### Bank account

Bank account payment method type allow to perform direct deposit and process pre-authorised payment.

The Following code Displays the Arguments to create a BankAccount Payment Method.
```
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";
var isCustomerAutomaticPaymentMethod = true;
var type = "Account";
var account = serverCaller.createBankAccountObject("Jeff Testing", "Personal bank account", "003", "12345", "98765432");

serverCaller.createDirectAccountPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, account, type, sessionToken)
.then(function (result) {
	//
})
.catch(rejct);
```

#### Interac

This payment method type allows to use Interac to collect or deposit money to a customer account.

The following  code displays the Arguments to Create an Interac Payment Method. and the Call to the Api.
```
var customerId = "bf199033-53a1-48cd-8f17-04254d026ecd";
var isCustomerAutomaticPaymentMethod = true;
var type = "Interac";

var InteracInformation = serverCaller.createInteracObject("Interac Test", "Kelly interac", "kinterac@dummytest.com", "8881234567","Remember the fruit", "8881234567") 

serverCaller.createInteracPaymentMethod(customerId, isCustomerAutomaticPaymentMethod, InteracInformation, sessionToken)
.then( function (result) {
	//
})
.catch()
;
```

## Bills and payments.
To begin proccessing payments with the Api you need first to create a bill.

#### Create a bill 
When creating a bill, it will return the created bill ID for further operation on the bill. Save that Id For Further operations on that bill.

*NOTE that the Merchant needs to be authorized to Use the Id to create a bill for.*

The following code displays the information needed for a bill Entitty
```
var breakIfMerchantNeverBeenAuthorized = true;
var billData = {
	MerchantId: "",
	BillTitle: "",
	BillDescription: "",
	BillAmount: 1,
	ExternalSystemBillNumber1: "",
	ExternalSystemBillNumber2: "",
	ExternalSystemBillNumber3: "",
	BillCurrency: 2,
	Language: 1,
	RelatedCustomerId: "bf199033-53a1-48cd-8f17-04254d026ecd"
};

serverCaller.createBill(breakIfMerchantNeverBeenAuthorized, billData, sessionToken)
.then(function (result) {
	
})
.catch(reject)
;
```
*Now that we have the bill we can start creating payments for that bill .*

#### Create Payments 
There is multiple way for the system to process the payment. The most common values used are “Auto select easier” and “Anonymous”. 
The first mode will process the payment using the information provided. 
The second will transmit the payment by email to an unknown customer

The following code show the Arguments needed for Creating a payment

*In this Example We are working with Annonymous Payment*
```
var billId = "3c7792af-f377-48ba-b3f1-0474f6eab127"; // the bill you wanna create the paymemnt for.
var setPaymentCustomerFromBill = false;
var customerEmail = "example@example.ca"; //Set the customer email to send the request by email to the customer. It allows the customer to fill its payment method information by himself. This requires the Payment Flow to be set to Anonymous.
        
var paymentInfo = {
	PaymentFlow: 1,
	RelatedCustomerId: "", // this field becomes optional when using the anounymous payment flow 
	DueDate: "2021-05-10T16:10:19.000Z",
	PaymentAmount: 1.22
};

serverCaller.createPayement(billId, setPaymentCustomerFromBill, customerEmail, paymentInfo, sessionToken)
.then(function (result) {
	//
})
.catch(reject)
```
> PaymentFlow.AnonymousNeedCustomerEmailPropertySet Makes the CustomerEmail Required

By this you now have created a payment for a bill.