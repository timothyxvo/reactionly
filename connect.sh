#!/bin/sh

chmod 400 .ssh/reactionly.pem
ssh -i .ssh/reactionly.pem ec2-user@reactionly.redirectme.net
