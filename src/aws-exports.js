const awsmobile = {
    "aws_project_region": "me-south-1",
    "aws_cognito_region": "me-south-1",
    "aws_user_pools_id": "me-south-1_gD1EEuUxn",
    "aws_user_pools_web_client_id": "27up698895a9uc74nvbsgu8pni",
    "oauth": {
        "domain": "aw-bh-sm-qa.auth.me-south-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:4200/login",
        "redirectSignOut": "http://localhost:4200/login",
        "responseType": "code"
    }
};


export default awsmobile;