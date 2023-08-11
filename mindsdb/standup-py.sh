#/bin/bash
python3 -m venv mindsdb
mv mindsdb pyenv
cd pyenv
source bin/activate
pip install --upgrade pip setuptools wheel
pip install mindsdb
pip freeze
python3 -m mindsdb