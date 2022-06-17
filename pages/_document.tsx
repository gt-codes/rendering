import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html lang='en'>
				<Head>
					{process.env.NODE_ENV === 'production' && (
						<script
							async
							defer
							data-website-id='c5fda3dc-b906-42e5-b838-ccb7a203e9c3'
							src='https://umami-production-2a81.up.railway.app/umami.js'
						/>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
