ssh -i ~/.ssh/id_rsa_local root@allfilm.mediadnnb.codes << \EOF
string_pids=`ps aux | grep serve | grep -v grep | tr -s ' ' | cut -d ' ' -f 2`

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

    cd ~/app/ALLFILM_FE/src

    echo "----------------Installing packages----------------"
    npm install
    echo "----------------Pulling source code from repo----------------"
    git fetch && git checkout master && git pull
    echo "----------------Build static files----------------"
    npm run build
    echo "----------------Starting server----------------"
    serve -s build &
else
    echo "No running process"
fi
EOF
