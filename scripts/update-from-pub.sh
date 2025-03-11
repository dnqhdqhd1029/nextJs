# styles 폴더 삭제
rm -rf ./src/styles

# styles 폴더 생성
mkdir ./src/styles

# pub 폴더로 이동
cd ..
cd mediabee-front-pub

# update from repository
git pull

# pub 폴더의 파일들을 mediabee-front로 복사
cp -r ./src/styles ../mediabee-front/src/
cp -r ./public ../mediabee-front/

# mediabee-front로 이동
cd ..
cd mediabee-front
