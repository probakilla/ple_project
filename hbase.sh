echo "Getting hbase commands..."
source /espace/Auber_PLE-005/user-env.sh 2> /dev/null
source /espace/Auber_PLE-ripoux/user-env.sh 2> /dev/null

echo "Getting environment variables..."
envFile="/.env"
envPath=$(pwd)$envFile
source $envPath

echo "Starting backend..."
pm2 start src/server/app.js -f --watch

echo "Starting hbase..."
hbase rest start -p $REST_PORT &