<<<<<<< HEAD
<!-- # Getting Started with Create React App
=======
# Backend
**DEPLOYEMENT ON AWS EC2 INSTANCE**
>>>>>>> bedfc1381d1ba6ddd80b821201ab55175c985249

1. Create your ec2 instance on aws wih ubuntu OS with the following security group added.
  ![Screenshot from 2022-03-28 13-46-57](https://user-images.githubusercontent.com/90921396/160355964-0159f363-fbe9-4858-8c07-1109100fe6ed.png)

  
2. ```sudo apt update```
  ![2](https://user-images.githubusercontent.com/90921396/160273749-d3c45c54-fba0-40d8-8bf4-d69f65efba60.png)

3. Install Nginx web Server to run node app.
`sudo apt-get install nginx`

  ![3](https://user-images.githubusercontent.com/90921396/160294043-19573a68-fec0-4602-895a-020d1b12a64d.png)
  
4.Install git on ubuntu.
`sudo apt-get install git`

![Screenshot from 2022-03-27 23-23-19](https://user-images.githubusercontent.com/90921396/160294115-6f2e98ae-5dd8-4e94-9653-a103e095ae6b.png)

  
5.Install node and npm.

  `curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -`

  `sudo apt install nodejs`

  `node --version`
  
  
6.Clone the repository
  git clone https://github.com/venkat0076/Backend.git

 ![Screenshot from 2022-03-27 23-43-07](https://user-images.githubusercontent.com/90921396/160294877-2190548f-5c91-4eaa-9aa1-79dc9ace9a2a.png)
 
7. Move to the Folder 
 `cd Backend`
 
8.Install dependency and test app

  `npm install` 
  `npm start`

Runs the app in the development mode .

9. Open in browser ** IPV4:8080 **

  


![Screenshot from 2022-03-28 00-17-27](https://user-images.githubusercontent.com/90921396/160296124-c78886bd-100f-409b-946d-bf18709b6de7.png)


 ** DEPLOY FRONTEND REACT **

1. Clone the React Repo.

 ```git clone https://github.com/venkat0076/Frontend.git```

2. move to the folder

``` cd Frontend```

3. Install all the dependencies and run.

```npm install```
```npm run```

4.Configure Nginx 

`sudo nano /etc/nginx/sites-available/default`

# Add this part to server block

 ```server_name _;

    location / {
        proxy_pass http://localhost:3000/; #whatever port your app runs on
    }
 ```
 
 # Check NGINX config
sudo nginx -t

# Restart NGINX
sudo service nginx restart

4. It will run on ** PUBLIC IPV4 **
![Screenshot from 2022-03-28 17-32-15](https://user-images.githubusercontent.com/90921396/160393766-6c6a1458-c013-475b-ab23-8422ec5b1ba5.png)

5. Change the api url in utils/api to the public IPV DNS:8080

**API DOCUMNENTAION**

https://www.postman.com/orvide/workspace/neurolingua


** CREDENTIAL FOR LOGIN **

# Login as teacher 
email - dipikesh.singh.915@gmail.com
password- Dipikesh@123

# Login as student

email - dipikesh2001@gmail.com
password- Dipikesh@123

# Login as admin

email - admin@neurolingua.in
password - Pass@123



<<<<<<< HEAD
This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->


# Backend

**DEPLOYEMENT ON AWS EC2 INSTANCE**

1. Create your ec2 instance on aws wih ubuntu OS.
2. sudo apt update
   ![2](https://user-images.githubusercontent.com/90921396/160273749-d3c45c54-fba0-40d8-8bf4-d69f65efba60.png)

3. Install Nginx web Server to run node app.
   ![3](https://user-images.githubusercontent.com/90921396/160294043-19573a68-fec0-4602-895a-020d1b12a64d.png)

4.Install git on ubuntu.
![Screenshot from 2022-03-27 23-23-19](https://user-images.githubusercontent.com/90921396/160294115-6f2e98ae-5dd8-4e94-9653-a103e095ae6b.png)

5. Clone the repository

`npm install`
Install the the required dependency.

`npm start`

Runs the app in the development mode .
Open http://localhost:8080 to RUN THE API SERVER.

Need to re-run the command `npm start` after making any changes.

**API DOCUMNENTAION**

https://www.postman.com/orvide/workspace/neurolingua

//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
# Backend

**DEPLOYEMENT ON AWS EC2 INSTANCE**

1. Create your ec2 instance on aws wih ubuntu OS.
2. sudo apt update
   ![2](https://user-images.githubusercontent.com/90921396/160273749-d3c45c54-fba0-40d8-8bf4-d69f65efba60.png)

3. Install Nginx web Server to run node app.
   ![3](https://user-images.githubusercontent.com/90921396/160294043-19573a68-fec0-4602-895a-020d1b12a64d.png)

4.Install git on ubuntu.
![Screenshot from 2022-03-27 23-23-19](https://user-images.githubusercontent.com/90921396/160294115-6f2e98ae-5dd8-4e94-9653-a103e095ae6b.png)

5.Install node and npm.

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt install nodejs

node --version

6.Clone the repository
git clone https://github.com/venkat0076/Backend.git

![Screenshot from 2022-03-27 23-43-07](https://user-images.githubusercontent.com/90921396/160294877-2190548f-5c91-4eaa-9aa1-79dc9ace9a2a.png)

7.Install dependency and test app

`npm install`
Install the the required dependency.

`npm start`

Runs the app in the development mode .
Open http://localhost:8080 to RUN THE API SERVER.

Need to re-run the command `npm start` after making any changes.

**API DOCUMNENTAION**

https://www.postman.com/orvide/workspace/neurolingua

/////////////////////////////


# Backend

**DEPLOYEMENT ON AWS EC2 INSTANCE**

1. Create your ec2 instance on aws wih ubuntu OS.
2. `sudo apt update`
   ![2](https://user-images.githubusercontent.com/90921396/160273749-d3c45c54-fba0-40d8-8bf4-d69f65efba60.png)

3. Install Nginx web Server to run node app.
   `sudo apt-get install nginx`

![3](https://user-images.githubusercontent.com/90921396/160294043-19573a68-fec0-4602-895a-020d1b12a64d.png)

4.Install git on ubuntu.
`sudo apt-get install git`

![Screenshot from 2022-03-27 23-23-19](https://user-images.githubusercontent.com/90921396/160294115-6f2e98ae-5dd8-4e94-9653-a103e095ae6b.png)

5.Install node and npm.

```curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt install nodejs

node --version
```

6.Clone the repository
git clone https://github.com/venkat0076/Backend.git

![Screenshot from 2022-03-27 23-43-07](https://user-images.githubusercontent.com/90921396/160294877-2190548f-5c91-4eaa-9aa1-79dc9ace9a2a.png)

7. Move to the Folder
   `cd Backend`

8.Install dependency and test app

`npm install`
`npm start`

Runs the app in the development mode .

9. Setup ufw firewall

```sudo ufw enable
sudo ufw status
sudo ufw allow ssh (Port 22)
sudo ufw allow http (Port 80)
sudo ufw allow https (Port 443)
```

10. Configure Nginx

`sudo nano /etc/nginx/sites-available/default`

# Add this part to server block

```server_name yourdomain.com www.yourdomain.com;

   location / {
       proxy_pass http://localhost:8080; #whatever port your app runs on
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
```

```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo service nginx restart

```

![Screenshot from 2022-03-28 00-17-27](https://user-images.githubusercontent.com/90921396/160296124-c78886bd-100f-409b-946d-bf18709b6de7.png)

Open http://localhost:8080 to RUN THE API SERVER.

Need to re-run the command `npm start` after making any changes.

**API DOCUMNENTAION**

https://www.postman.com/orvide/workspace/neurolingua
=======
>>>>>>> bedfc1381d1ba6ddd80b821201ab55175c985249
