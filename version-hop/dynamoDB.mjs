const AWS = require('aws-sdk')

export const insertNewVersion = async (id, codeVersion, contentVersion) => {
  let versions
  try {
    const documentClient = new AWS.DynamoDB.DocumentClient()
    await documentClient.update({ TableName: process.env.TABLE_NAME, Key: { id } }).promise()
    console.log('PIPSQUEEK new version', id, codeVersion, contentVersion)
  } catch (e) {
    console.log(e)
  }
  return versions
}

export const fetchKeyedVersion = async (id) => {
  let versions
  try {
    const documentClient = new AWS.DynamoDB.DocumentClient()
    const fetched = await documentClient
      .get({ TableName: process.env.TABLE_NAME, Key: { id } }) // using the env variable from lambda definition. The key id should come from the domain.
      .promise()
    versions = fetched.Item
    console.log('GOZDECKI versions', versions)
  } catch (e) {
    console.log(e)
    versions = {
      codeVersion: 'production',
      contentVersion: 'contentVersion1'
    }
  }
  return versions
}

export const fetchLiveVersions = async () => {
  let versions
  try {
    const documentClient = new AWS.DynamoDB.DocumentClient()
    const fetched = await documentClient
      .scan({ TableName: process.env.TABLE_NAME }) // using the env variable from lambda definition. The key id should come from the domain.
      .promise()
    versions = fetched.Items
    console.log('PIPSQUEEK versions', versions)
  } catch (e) {
    console.log(e)
    versions = [
      {
        codeVersion: 'production',
        contentVersion: 'contentVersion1'
      }
    ]
  }
  return versions
}
