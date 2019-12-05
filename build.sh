#npm install

npm run build --prefix ./frontend

export AWS_PROFILE=perfsys

export WEBSITE_S3_BUCKET=aws-website-cloud-reports-dev-temp
export WEBSITE_S3_BUCKET_PREFIX=https://$WEBSITE_S3_BUCKET.s3.eu-central-1.amazonaws.com
export AWS_REGION=eu-central-1
export ACCOUNT_ID=perfsys

AWS_PROFILE=perfsys aws s3 cp --recursive dist/ s3://$WEBSITE_S3_BUCKET/public/ --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
sed -i -e "s|/assets/|$WEBSITE_S3_BUCKET_PREFIX/public/assets/|g" dist/index.html
sls deploy -v
#aws cloudformation package --template template.yml --s3-bucket $S3_BUCKET --output-template template-export.yml

#sed -i.bak 's/\$PARTITION\$/'${PARTITION}'/g;s/\$AWS_REGION\$/'${AWS_REGION}'/g;s/\$ACCOUNT_ID\$/'${ACCOUNT_ID}'/g;s/\$PROJECT_ID\$/'${PROJECT_ID}'/g' template-configuration.json

