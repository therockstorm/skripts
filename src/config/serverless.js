module.exports = {
  cfnRole: process.env.SKRIPTS_CFN_ROLE || null,
  custom: {
    tags: {
      Creator: "serverless",
      Environment: "${self:provider.stage}",
      Project: "${self:service.name}",
    },
    webpack: { includeModules: true },
  },
  frameworkVersion: ">=1.0.0 <2.0.0",
  logRetentionInDays: 365,
  provider: {
    deploymentBucket: process.env.SKRIPTS_DEPLOYMENT_BUCKET
      ? {
          name: process.env.SKRIPTS_DEPLOYMENT_BUCKET,
          serverSideEncryption: "AES256",
        }
      : null,
    environment: { AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1 },
    memorySize: 128,
    name: "aws",
    region: "us-west-2",
    runtime: "nodejs12.x",
    stackTags: "${self:custom.tags}",
    stage: "${opt:stage, env:STAGE, env:ENVIRONMENT}",
    tags: "${self:custom.tags}",
    timeout: 10,
  },
  package: { individually: true },
  plugins: [
    "serverless-iam-roles-per-function",
    "serverless-pseudo-parameters",
    "serverless-webpack",
  ],
  service: "${file(./package.json):name}",
  vpc:
    process.env.SKRIPTS_VPC_SECURITY_GROUPS && process.env.SKRIPTS_VPC_SUBNETS
      ? {
          securityGroupIds: process.env.SKRIPTS_VPC_SECURITY_GROUPS.split(","),
          subnetIds: process.env.SKRIPTS_VPC_SUBNETS.split(","),
        }
      : null,
}
