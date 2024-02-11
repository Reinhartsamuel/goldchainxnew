import Error from "next/error";

const SibApiV3Sdk = require('@getbrevo/brevo');

export async function POST() {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = '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';
    



    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = { "name": "John", "email": "example@example.com" };
    sendSmtpEmail.to = [
        { "email": "example@brevo.com", "name": "sample-name" }
    ];
    sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };




    sendSmtpEmail.subject = "Njir";
    sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = { "name": "Reinhart kuda", "email": "reinhart@importir.com" };
    sendSmtpEmail.to = [{ "email": "reinhartsams@gmail.com", "name": "Reinhart Samuel" }];
    sendSmtpEmail.cc = [{ "email": "example2@example2.com", "name": "Janice Doe" }];
    sendSmtpEmail.bcc = [{ "name": "John Doe", "email": "example@example.com" }];
    sendSmtpEmail.replyTo = { "email": "replyto@domain.com", "name": "John Doe" };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value", "subject": "New Subject" };





    // apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    //     console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    // }, function (error) {
    //     console.error(error);
    // });

    try {
        const res = await apiInstance.sendTransacEmail(sendSmtpEmail);
        return Response.json({
            status: true,
            data: res
        })
    } catch (error: Error | any) {
        return Response.json({ status: false, message: error.message })
    }
}