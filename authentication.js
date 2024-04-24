// Fonction de création de compte
function createAccount() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Ici, vous pouvez effectuer des vérifications supplémentaires, par exemple, avec une base de données d'utilisateurs
    // Pour cet exemple, nous utilisons juste une comparaison de chaînes simples pour l'adresse e-mail et le mot de passe
    if (email && username && password) {
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Compte créé avec succès !');
    } else {
        alert('Merci de remplir tous les champs !');
    }
}

// Fonction de connexion
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        alert('Login successful!');
        localStorage.setItem('loggedIn', true);
        // Rediriger l'utilisateur vers une autre page ou effectuer d'autres actions après la connexion réussie
    } else {
        alert('Invalid username or password!');
    }
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('loggedIn');
    alert('Logged out successfully!');
}

// Vérifier l'état d'authentification au chargement de la page
window.onload = function() {
    if (localStorage.getItem('loggedIn')) {
        // Si l'utilisateur est connecté, masquer le formulaire de connexion et afficher le bouton de déconnexion
        document.getElementById('authContainer').innerHTML = '<h2>Welcome, ' + localStorage.getItem('username') + '</h2><button onclick="logout()">Logout</button>';
    }
}
