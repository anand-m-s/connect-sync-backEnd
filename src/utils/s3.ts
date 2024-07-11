// import {PutObjectCommand,S3Client} from "@aws-sdk/client-s3"
// import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
// import awsConfig from "../frameworks/webserver/config/awsConfig";

// const s3 = new S3Client({
//   region: awsConfig.AWS.Region,
//   credentials: {
//     accessKeyId: awsConfig.AWS.AccessKeyId,
//     secretAccessKey: awsConfig.AWS.AWSSecretKey,
//   },
// });
// const BUCKET_NAME = awsConfig.AWS.BucketName;
// export async function createPresignedPost({ key,contentType}) {
//   const command = new PutObjectCommand({
//     Bucket: BUCKET_NAME,
//     Key: key,
//     ContentType: contentType,
//   });
//   const fileLink = `https://${BUCKET_NAME}.s3.${awsConfig.AWS.Region}.amazonaws.com/${key}`;
//   const signedUrl = await getSignedUrl(s3, command, {
//     expiresIn: 5 * 60, // 5 minutes - default is 15 mins
//   });
//   return { fileLink, signedUrl };
// }

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import awsConfig from "../frameworks/webserver/config/awsConfig";

// Ensure that awsConfig values are not undefined
if (!awsConfig.AWS.AccessKeyId || !awsConfig.AWS.AWSSecretKey || !awsConfig.AWS.BucketName) {
  throw new Error("Missing AWS configuration values");
}

const s3 = new S3Client({
  region: awsConfig.AWS.Region,
  credentials: {
    accessKeyId: awsConfig.AWS.AccessKeyId,
    secretAccessKey: awsConfig.AWS.AWSSecretKey,
  },
});

const BUCKET_NAME = awsConfig.AWS.BucketName;

interface PresignedPostParams {
  key: string;
  contentType: string;
}

interface PresignedPostResponse {
  fileLink: string;
  signedUrl: string;
}

export async function createPresignedPost({
  key,
  contentType,
}: PresignedPostParams): Promise<PresignedPostResponse> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  const fileLink = `https://${BUCKET_NAME}.s3.${awsConfig.AWS.Region}.amazonaws.com/${key}`;
  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: 5 * 60, //=======default is 15m ,changed to 5m
  });
  return { fileLink, signedUrl};
}