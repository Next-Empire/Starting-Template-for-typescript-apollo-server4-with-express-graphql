# Starting Template for typescript, apollo server 4 with express, graphql

### Run in Dev mode

```
npm run dev
```

### Build Typescript

```
npm run build
```

### Build and Run

```
npm start
```

---

## Creating self signed certificate to test under local host

If you are working with a local development environment and you need to generate an SSL/TLS certificate for a domain name that is not publicly accessible (e.g., localhost), you can create a self-signed certificate that is valid for your specific domain name or IP address.

Here are the general steps to follow using OpenSSL:

1. `Create a new private key:`

```js
openssl genrsa -out key.pem 2048
```

2. Create a new certificate signing request (CSR) with the correct domain name or IP address:

```js
openssl req -new -key key.pem -out cert.csr -subj "/CN=localhost"
```

Replace "localhost" with the domain name or IP address you want to use.

3. Generate a self-signed SSL/TLS certificate with the CSR and private key:

```js
openssl x509 -req -days 365 -in cert.csr -signkey key.pem -out cert.pem
```

Install the new SSL/TLS certificate on the server and configure the server to use the new certificate.
Note: The exact steps for installing and configuring the new SSL/TLS certificate will depend on the server software and operating system you are using. Consult the documentation for your server software for specific instructions.

After completing these steps, your server should have a new self-signed SSL/TLS certificate that is valid for your specific domain name or IP address. You should be able to use this certificate to establish a secure connection to your localhost server on port 4000 without encountering the "Hostname/IP does not match certificate's altnames" error.

---

## PM2

PM2 provides several benefits for managing your GraphQL API. Here are a few examples:

> - `Process management`: PM2 helps you manage your GraphQL API as a process, allowing you to start, stop, restart, and monitor your application with ease.
>
> - `Automatic restart`: PM2 can automatically restart your GraphQL API in case of a crash or error, ensuring that your application is always running smoothly.
>
> - `Load balancing`: If your GraphQL API receives a high volume of traffic, PM2 can help you distribute the load across multiple instances of your application, improving performance and reliability.
>
> - `Logging`: PM2 provides built-in log management capabilities, making it easy to view and analyze logs from your GraphQL API.
>
> - `Deployment`: PM2 can simplify the deployment process for your GraphQL API by providing a variety of deployment options, including Git integration, script deployment, and more.

Overall, PM2 can help you streamline the management of your GraphQL API, improve its performance and reliability, and simplify the deployment process.
