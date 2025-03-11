rm -rf ./public/editor/build

cd ..
cd ckeditor

npm run build

cp -r ./build ../mediabee-front/public/editor

# mediabee-front로 이동
cd ..
cd mediabee-front
