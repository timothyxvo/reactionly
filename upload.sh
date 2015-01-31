#!/bin/sh

chmod 400 .ssh/reactionly.pem
scp -r -i .ssh/reactionly.pem html/* ec2-user@reactionly.redirectme.net:/var/www/html
