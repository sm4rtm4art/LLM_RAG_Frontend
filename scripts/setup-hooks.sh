#!/bin/bash

# Install pre-commit
echo "Installing pre-commit..."
if ! command -v pre-commit &> /dev/null
then
    echo "pre-commit not found, installing with pip..."
    pip install pre-commit
fi

# Install the git hook scripts
echo "Setting up pre-commit hooks..."
pre-commit install

# Check installation
echo "Checking pre-commit installation..."
pre-commit --version

echo "Pre-commit hooks have been set up successfully!"
echo "These hooks will run automatically before each commit."
echo "To run hooks manually: pre-commit run --all-files"
