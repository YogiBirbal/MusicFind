require 'vendor/autoload.php';

$session = new SpotifyWebAPI\Session(
    'd5f5e4ab7b124fbba4fb37d6b3df37bf',
    'edd9260ba12f4ee0b2295d96b46ab7b4'
);

$session->requestCredentialsToken();
$accessToken = $session->getAccessToken();

// Store the access token somewhere. In a database for example.

// Send the user along and fetch some data!
header('Location: app.php');
die();