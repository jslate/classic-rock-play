This is a fun little project based on this data: https://github.com/fivethirtyeight/data/tree/master/classic-rock

The data are from 25 stations from across the United States for one week in June 2014. The analysis by Walt Hickey from FiveThirtyEight is fascinating. I just couldn't help but notice that Led Zeppelin wasn't in the list of top 15 songs. So I was curious to see how many songs various bands had in the list and how the number of plays compared. This gives the idea at least:

![Aerosmith vs. Led Zeppelin](/public/images/led-zeppelin-aerosmith-screenshot.png)

This is an Express (Node.js) application with a React application for the frontend. I haven't really worked much with Express before so I'm sure I'm doing some things wrong. I'm not setting propTypes on my components and there really aren't any tests. But hey, it's just for fun!

You should in theory be able to run the project:

1. `yarn`
1. `cd frontend && yarn && cd ..`
1. `yarn server`
1. (in another terminal) `yarn client`

There are some layout issues if your window is over 1000px wide, and it probably doesn't work to well on a phone, for that matter.
