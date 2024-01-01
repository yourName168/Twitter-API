import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { config } from 'dotenv'
import fs from 'fs'
import path from 'path'

config()
const verifyEmailTemplate = fs.readFileSync(path.resolve('src/templates/veify-email.html'), 'utf8')

// Create SES service object.
const sesClient = new SESClient({
  region: process.env.AWS_REGION as string,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
  }
})

const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body = '',
  subject = '',
  replyToAddresses = []
}: {
  fromAddress?: string
  toAddresses: string | string[]
  ccAddresses?: string | string[]
  body: string
  subject: string
  replyToAddresses?: string | string[]
}) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: fromAddress,
    ReplyToAddresses: replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses]
  })
}

const sendVerifyEmail = async (toAddress: string, subject: string, body: string) => {
  const sendEmailCommand = createSendEmailCommand({
    fromAddress: process.env.SES_FROM_ADDRESS,
    toAddresses: toAddress,
    body,
    subject
  })
  return await sesClient.send(sendEmailCommand)
}

export const sendVerifyEmailTemplate = async (toAddress: string, token: string) => {
  const body = verifyEmailTemplate.replace('{{{ $url }}}', `${process.env.CLIENT_URL}/verify-email?token=${token}`)
  return await sendVerifyEmail(toAddress, 'Verify Email', body)
}
export const sendValidateForgotPasswordToken = async (toAddress: string, token: string) => {
  const body = verifyEmailTemplate.replace(
    '{{{ $url }}}',
    `${process.env.CLIENT_URL}/validate-forgot-password-token?token=${token}`
  )
  return await sendVerifyEmail(toAddress, 'Forgot Password', body)
}
