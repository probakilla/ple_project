echo "Getting hbase commands on 005..."
source /espace/Auber_PLE-005/user-env.sh 2> /dev/null

if [ $? -ne 0 ]; then
    echo "Getting hbase commands on C..."
    source /espace/Auber_PLE-ripoux/user-env.sh 2> /dev/null
fi

echo "Getting environment variables..."
envFile="/.env"
envPath=$(pwd)$envFile
source $envPath

echo "Starting backend..."
pm2 start src/server/app.js -f --watch

echo "Starting hbase..."
hbase rest start -p $REST_PORT &