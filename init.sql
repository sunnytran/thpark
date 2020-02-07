CREATE TABLE users (
	account_id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	username text NOT NULL,
	password text NOT NULL
);

INSERT INTO users(username, password) VALUES ('test', '12345');
