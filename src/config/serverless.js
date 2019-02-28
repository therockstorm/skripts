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
  logRetentionInDays: 365,
  provider: {
    deploymentBucket,
    memorySize: 128,
    name: "aws",
    region: "us-west-2",
    runtime: "nodejs8.10",
    stackTags: "${self:custom.tags}",
    stage: "${opt:stage, env:ENVIRONMENT}",
    tags: "${self:custom.tags}",
    timeout: 10
  },
  package: { individually: true },
  plugins: ["serverless-webpack"],
  service: "${file(./package.json):name}"
}
