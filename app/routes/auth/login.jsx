import { Link, useActionData } from '@remix-run/react';
import { json, redirect } from '@remix-run/server-runtime';
import { db } from '~/utils/db.server';

function validateUsername(username) {
	if (typeof username !== 'string' || username.length < 3) {
		return 'Username should be at least 3 characters long';
	}
}

function validatePassword(body) {
	if (typeof body !== 'string' || body.length < 3) {
		return 'Password should be at least 3 characters long';
	}
}

function badRequest(data) {
	return json(data, { status: 400 });
}

export const action = async ({ request }) => {
	const form = await request.formData();
	const loginType = form.get('loginType');
	const username = form.get('username');
	const password = form.get('password');

	const fields = { loginType, username, password };

	const fieldErrors = {
		username: validateUsername(username),
		password: validatePassword(password),
	};

	if (Object.values(fieldErrors).some(Boolean)) {
		return badRequest({ fieldErrors, fields });
    }
    
    switch (loginType) {
        case 'login':
            
            break;
    
        default:
            break;
    }
};

export default function Login() {
	const actionData = useActionData();

	return (
		<div className='auth-container'>
			<div className='page-header'>
				<h1>Login</h1>
			</div>

			<div className='page-content'>
				<form method='POST'>
					<fieldset>
						<legend>Login or Register</legend>
						<label>
							<input
								type='radio'
								name='loginType'
								value='login'
								defaultChecked={
									!actionData?.fields?.loginType ||
									actionData?.fields?.loginType === 'login'
								}
							/>{' '}
							Login
						</label>
						<label>
							<input
								type='radio'
								name='loginType'
								value='register'
							/>{' '}
							Register
						</label>
					</fieldset>
					<div className='form-control'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							name='username'
							id='username'
							defaultValue={actionData?.fields?.username}
						/>
						<div className='error'>
							{actionData?.fieldErrors?.username &&
								actionData?.fieldErrors?.username}
						</div>
					</div>
					<div className='form-control'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							defaultValue={actionData?.fields?.password}
						/>
                        <div className='error'>
                            {actionData?.fieldErrors?.password &&
                                actionData?.fieldErrors?.password}
                        </div>
					</div>
					<button type='submit' className='btn btn-block'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}
