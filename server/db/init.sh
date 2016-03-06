#!/bin/bash

# Create a superuser called peekay
createuser -s -w peekay

# Create knowit database
create db knowit

# Create knowit schema and tables
psql -U peekay -d knowit -a -f schema.sql
