# กำหนด Type และ Service ที่จะ Deploy เป็นค่าเริ่มต้น
TYPE=
ONLY=frontend_app,backend
MODE=Normal
MODE_COMMAND=
COMPOSE=up
NAME=Deploy

# วนลูปเช็ค Args ที่ใส่เข้ามา แล้วดูว่าเข้าเคสไหน
for arg in "$@"
do
  case $arg in
    --up)
    COMPOSE=up
    NAME=Deploy
    shift
    ;;
    --down)
    COMPOSE=down
    NAME=Down
    shift
    ;;
    --restart)
    COMPOSE=restart
    NAME=Restart
    shift
    ;;
    -d|--detach)
    MODE=Detached
    MODE_COMMAND=-d
    shift
    ;;
    -t|--type)
    TYPE="$2"
    shift # Remove argument name from processing
    shift # Remove argument value from processing
    ;;
    --only)
    ONLY="$2"
    shift # Remove argument name from processing
    shift # Remove argument value from processing
    ;;
  esac
done

# ดูตัวแปร Args ของ Type ว่าเป็น development หรือ production หรือเปล่า
if [ "${TYPE}" = 'development' ] || [ "${TYPE}" = 'production' ];
then
  # ใส่สีให้ข้อความ และใส่เป็นตัวแปรต่าง ๆ
  TYPE_COLOR=$'\e[1;32m'$TYPE$'\e[0m'
  SERVICE_COLOR=$'\e[1;35m'${ONLY//,/ }$'\e[0m'
  MODE_COLOR=$'\e[1;32m'$MODE$'\e[0m'

  echo "                                  "
  echo "======== $NAME [$TYPE_COLOR] ====="
  echo "- Service: $SERVICE_COLOR         "
  echo "- Mode: $MODE_COLOR               "
  echo "================================= "
  echo "                                  "
  if [ "${COMPOSE}" = 'up' ];
  then
    docker-compose -f docker-compose.yaml -f deploy/docker-compose.$TYPE.yaml up $MODE_COMMAND ${ONLY//,/ }
  elif [ "${COMPOSE}" = 'down' ]
  then
    docker-compose down
    docker rmi -f adsolo-k8s_${ONLY//,/  adsolo-k8s_}
  elif [ "${COMPOSE}" = 'restart' ]
  then
    docker-compose down
    docker rmi -f adsolo-k8s_${ONLY//,/  adsolo-k8s_}
    docker-compose -f docker-compose.yaml -f deploy/docker-compose.$TYPE.yaml up $MODE_COMMAND ${ONLY//,/ }
  fi
else
  echo "                               "
  echo $'\e[1;31m'Please specify type to deploy.$'\e[0m'
  echo "                               "
  echo "====== Example command ======= "
  echo $'\e[1;35m'sh deploy.sh --type production$'\e[0m'
  echo "============================== "
  echo "                               "
fi