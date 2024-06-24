
interface AwsConfig {
    AWS: {
        Region: string;
        AccessKeyId: string|undefined;
        AWSSecretKey: string|undefined;
        BucketName: string|undefined;
    };
}

const awsConfig:AwsConfig = {
    AWS:{
        AccessKeyId: process.env.AWS_ACCESS_KEY_ID,
        AWSSecretKey:process.env.AWS_SECRET_KEY,
        BucketName:process.env.AWS_S3_BUCKET_NAME,
        Region:"ap-south-1",
    },
}

export default awsConfig;