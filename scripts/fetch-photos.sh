#!/bin/sh
set -e
cd "$(dirname "$0")/../assets"
u=https://images.unsplash.com
curl -fsSL -o photo-desk.jpg "$u/photo-1501159873713-dc65286617cc?w=900&h=1100&fit=crop&crop=right&q=72&fm=jpg"
curl -fsSL -o photo-letters.jpg "$u/photo-1526554850534-7c78330d5f90?w=1400&h=1000&fit=crop&q=72&fm=jpg"
curl -fsSL -o photo-stamps.jpg "$u/photo-1559057287-ce0f595679a8?w=2000&h=1100&fit=crop&q=70&fm=jpg"
