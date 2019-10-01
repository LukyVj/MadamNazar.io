<img src="https://puu.sh/ElY0b/cccc9578bb.png"/>

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Definition

This project is a small project I'm trying to maintain as much as possible. 
I've made it to help people who play the game __Red dead redemption 2 Online__ - In this game you can get different "jobs" including "collector" - You need to collect items and eventually sell them to a NPC, you can also buy item from this NPC. 

The "problem" is that this NPC is on a 24h constant rotation, meaning that every day, the NPC location changes. 

This tool aims to detect the NPC's position as soon as possible, and display the information on a website. 

## How it operates

__TODO: [ write & explain API ]__

# PLEASE STOP READING HERE 

The following content is obsolete and will be replaced soon 

<details>
### 2 - Display data
Once we got the tweet that interest us, we will only extract & use some of it's informations:

- The date 
- The text
- Media ( one or two images to illustrate the location ) 
- the last hashtag which is used for coordinates: `#p<num>x` where `num` is the coordinate

### 3 - Generate Map
And lastly, at the same time as we display the informations, we will pass the last hashtag to the map. Making sure to only get the value between the `p` and the `x` which will be a number. 

That number will indicate to the map, which point to highlight. If you're not sure of which coordinate it is, you can inspect the map, you'll see SVG circles with IDs like `id="1_one"`. 

Let's say you tweet and add as an hashtag: `#p3x`, we will get the substring *3* which will then be used by the map like the following: 

```javascript
componentDidMount() {
    document.querySelector(`svg circle[id^="${this.state.loc}_"]`).style.fill ="red";
  }
```
_Where `this.state.loc` = *3*_


## Caveats
If you've read till here, thank you for the interest you show into this project. 
Let's talk about the potential caveats/issues this project suffer from. 

First, it's all manual. 
It means that one of the person from the "legit" account on Twitter *must* tweet everyday with an updated location for it to work. 

It's kind of time consuming, and so far there is only two accounts that tweet these informations. The more the merrier, the merrier the better you see :) 

Because it's manual, I personally update the location everyday when I reach work. 
Which means that I cannot really take pictures from my gaming console, which means that so far, most of the images displayed days after day, are most of the time, not mine. And yes, it's a shame. it's a risk I'm willing to take for a moment for the RDO community. 

I'm aware that the current way the project works is not ideal, and requires a lot of manual interactions, which means that, it can contains errors. Either from our side, like forgeting to update the location one day. Or just making a typo and breaking the system ( like what if you tweet `o12x` instead of `p12x` for the coordinates. 


## Future

I really enjoy working on this project, for a lot of reasons, but the first one is the fact that I love to create Web experiments and projects. 

As emphasized in the previous section, this project's system is far from idea, and I would like to get the single source of truth from a more reliable plateform ( like reddit, https://www.reddit.com/r/RedDeadDailies ) or something similar. I'm still notsure for how long this project will live. 

If I'll have at some point enough cointributors to let the project live by itself from time to time. 

## Next steps ( implementation ) 
- [ ] Being able to add a time constrain. Meaning that I'd like to check per day if the location was found. And display a message if it's not the case like: "Madam Nazar wasn't found yet, search more!" 
- [ ] Being able to record her moves to try to find a rotation pattern
- [ ] From the point defined right before. I'd like to display a calendar to explore her locations per day
- [ ] Drastically improve the mobile version 
</details>

## Available Scripts
- yarn start
- yarn build
- yarn test 
- yarn deploy




## Thank you for reading
