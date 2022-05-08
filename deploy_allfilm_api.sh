ssh -i ~/.ssh/id_rsa_local root@209.97.168.57 << \EOF
string_pids=`ps aux | grep app.local.js | grep -v grep | tr -s ' ' | cut -d ' ' -f 2`

array_pids=($string_pids)

count_pids=${#array_pids[@]}

if [ $count_pids -gt 0 ]
then
    echo "----------------Killing running processes----------------"
    for pid in "${array_pids[@]}"
    do
        kill $pid
        echo "Process $pid is killed"
    done

    cd ~/app/ALLFILM_API

    echo "----------------Installing packages----------------"
    yarn install
    echo "----------------Migrating database----------------"
    yarn db:migrate
    echo "----------------Pulling source code from repo----------------"
    git fetch && git checkout develop && git pull
    echo "----------------Starting server----------------"
    yarn start &
else
    echo "No running process"
fi
EOF
