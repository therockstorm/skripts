const deploymentBucket = process.env.DEPLOYMENT_BUCKET
  ? {
      name: "${env:DEPLOYMENT_BUCKET}",
      serverSideEncryption: "AES256"
    }
  : null

module.exports = {
  custom: {
    tags: {
      Creator: "serverless",
      Environment: "${self:provider.stage}",
      Project: "${self:service.name}"
    },
    webpack: { includeModules: true }
  },
  frameworkVersion: ">=1.0.0 <2.0.0",
  logRetentionInDays: 365,
  provider: {
    deploymentBucket,
    environment: { AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1 },
    memorySize: 128,
    name: "aws",
    region: "us-west-2",
    runtime: "nodejs10.x",
    stackTags: "${self:custom.tags}",
    stage: "${opt:stage, env:STAGE, env:ENVIRONMENT}",
    tags: "${self:custom.tags}",
    timeout: 10
  },
  package: { individually: true },
  plugins: ["serverless-iam-roles-per-function", "serverless-webpack"],
  service: "${file(./package.json):name}"
}
