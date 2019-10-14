module.exports.config = () => {
  // Code that generates dynamic data
  return {
    service: 'cloud-reports',
    region: 'eu-central-1',
    stage: 'dev',
    tableName: `reports`

  };
};