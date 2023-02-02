# NVM (Node Version Manager)
Node.js 버전을 관리하는 프로그램, 어느 버전이든 설치, 변경, 삭제 가능하다.

<!-- **Mac OS Node 삭제 방법**: https://gomugom.github.io/how-to-remove-node-from-macos/ -->

<!-- **VSCode에서 터미널 호출시 버전을 못 찾을 때**: https://github.com/Microsoft/vscode-docs/blob/master/docs/editor/integrated-terminal.md#why-is-nvm-complaining-about-a-prefix-option-when-the-integrated-terminal-is-launched
```sh
# nvm is not compatible with the npm config "prefix" option: currently set to "/usr/local"
# Run `npm config delete prefix` or `nvm use --delete-prefix v8.12.0 --silent` to unset it.
## nvm 설치 전에 npm이 설치되어서 문제가 발생 한다.
ls -la /usr/local/bin | grep npm
rm -R /usr/local/bin/npm /usr/local/lib/node_modules/npm/bin/npm-cli.js
``` -->

<!-- **nvm 삭제 방법**:
```sh
rm -rf ~/.nvm
rm -rf ~/.npm
rm -rf ~/.bower
``` -->

## Mac OS

https://github.com/nvm-sh/nvm

https://gist.github.com/falsy/8aa42ae311a9adb50e2ca7d8702c9af1
```sh
# 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

# vi 에디터 실행
vi ~/.bash_profile

# 해당 경로 적용 시키키
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# ~/.bash_profile 재 실행 시키기
source ~/.bash_profile
```

## Windows

https://github.com/coreybutler/nvm-windows/releases

```sh
# 설치 된 node.js 리스트를 본다.
nvm ls

# 해당 버전을 설치 한다.
nvm install 14.15.5

# 해당 버전을 삭제 한다.
nvm uninstall 14.15.5

# 해당 버전을 사용 한다.
nvm use 14.15.5

# 기본 버전 변경 한다.
nvm alias default 14.15.5
```
