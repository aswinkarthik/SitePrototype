server_path="build/"
if ! [[ -z $1 ]]; then
	server_path=$server_path$1
elif ! [[ -z $ENVIRONMENT ]]; then
	server_path=$server_path$ENVIRONMENT
else
	server_path=$server_path"dev"
fi

echo "Starting Server at "$server_path

ruby -rwebrick -e "WEBrick::HTTPServer.new(:Port=>4000,:DocumentRoot=>'$server_path').start"