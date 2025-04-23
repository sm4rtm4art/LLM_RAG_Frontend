#!/bin/bash

# Temporarily disable GPG signing
echo "Temporarily disabling GPG signing for Git commits..."
git config --local commit.gpgsign false

echo "You can now commit without GPG signing."
echo "To re-enable GPG signing later, run:"
echo "git config --local commit.gpgsign true"

echo ""
echo "For a permanent fix to the 'Inappropriate ioctl for device' error, add this to your ~/.bashrc or ~/.zshrc:"
echo 'export GPG_TTY=$(tty)' 