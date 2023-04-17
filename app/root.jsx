import { Outlet, LiveReload, Link } from '@remix-run/react';

export default function App() {
	return (
		<Document>
			<Layout>
				<Outlet />
			</Layout>
		</Document>
	);
}

function Document({ children, title }) {
	return (
		<html lang='en'>
			<head>
				<meta charset='UTF-8' />
				<meta http-equiv='X-UA-Compatible' content='IE=edge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<title>{title ? title : 'Remix Blog'}</title>
			</head>
			<body>
				{children}
				{process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
			</body>
		</html>
	);
}

function Layout({ children }) {
	return (
		<>
			<nav className="navbar">
				<Link to="/" className='logo'>
					Remix
				</Link>
				<ul className="nav">
					<li>
						<Link to="/posts">Posts</Link>
					</li>
				</ul>
			</nav>

			<div className="container">
				{children}
			</div>
			
		</>
	);
}