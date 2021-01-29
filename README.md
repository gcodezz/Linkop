# Linkop Client



# App Details
 Linkop-client is the client side of the linkop application; A social media app where you can meet new friends, share posts, comment on posts, etc. It's developed with react, redux technologies and Material UI

The app will consist of:

    └──Login page

    └──Signup page

    └──Home page

        └──Profile Section
        
        └──Post Section

        └──Add comment Section

        └──Notification Section



# Proposed Stack

JavaScript (React)

# Proposed Technologies

Redux

Material UI


# Top-level directory layout

    📦linkop-
        ┣📦image
            ┗ 📜no-img.js
        ┣📦src
            ┣ 📦components
                ┣ 📦comment
                    ┣ 📜Comment.js
                    ┗ 📜CommentForm.js
                ┣ 📦layout
                    ┗ 📜Navbar.js
                ┣ 📦notification
                    ┗ 📜Notifications.js
                ┣ 📦profile
                    ┣ 📜EditDetails.js
                    ┣ 📜Profile.js
                    ┗ 📜StaticProfile.js
                ┗ 📦scream
                    ┣ 📜DeleteScream.js
                    ┣ 📜LikeButton.js
                    ┣ 📜PostScream.js
                    ┣ 📜Scream.js
                    ┗ 📜ScreamDialog.js
            ┣ 📦image
                ┗ 📜no-img.js
            ┣ 📦pages
                ┣ 📜home.js
                ┣ 📜login.js
                ┣ 📜signup.js
                ┗ 📜user.js
            ┣ 📦store
                ┣ 📦actions.js
                    ┣ 📜actionTypes.js
                    ┣ 📜auth.js
                    ┣ 📜data.js
                    ┗ 📜user.js
                ┗ 📦reducers.js
                    ┣ 📜auth.js
                    ┣ 📜data.js
                    ┣ 📜ui.js
                    ┗ 📜user.js
            ┣ 📦utils
                ┣ 📜MyButton.js
                ┣ 📜profileSkeleton.js
                ┣ 📜ScreamSkeleton.js
                ┗ 📜theme.js
            ┣ 📜App.css
            ┣ 📜App.js
            ┣ 📜index.js
            ┣ 📜.gitignore
            ┣ 📜package-lock.json
            ┣ 📜package.json
            ┣ 📜README.md
            ┗ 📜yarn.lock


# How to setup project and run locally

### Clone the repository 

```
git clone https://github.com/gcodezz/Linkop-client.git

```

### Install all dependencies

Using npm

```
npm install
```

### Start watching the file and changes

Using npm

```
npm start --reset-cache
```
