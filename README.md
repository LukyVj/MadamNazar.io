This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Definition

This project is a small project I'm trying to maintain as much as possible. 
I've made it to help people who play the game __Red dead redemption 2 Online__ - In this game you can get different "jobs" including "collector" - You need to collect items and eventually sell them to a NPC, you can also buy item from this NPC. 

The "problem" is that this NPC is on a 24h constant rotation, meaning that every day, the NPC location changes. 

This tool aims to detect the NPC's position as soon as possible, and display the information on a website. 

## How it operates

It's fairly simple and can be broke down in 3 steps: 

### 1 - Fetch fata ( client side ) Using Twitter API
- We use the Twitter API with an exposed API key ( it's okay lol ) 
- We use the Twitter api `/search` endpoint. ( https://api.twitter.com/1.1/search/tweets.json?q=<query>&tweet_mode=extended )
- We pass as a query the following hashtag `%23NazarFinder` ( `%23` is the HTML entity for `#` ) 
- It will fetch all the latest tweets mentioning this hashtag. 
- Then we filter some JSON responses, by defining from wich account we want to get the data. This is to ensure that the account that tweet is qualified as "Legit" and therefore will have a real information. 

Here is how the JSON answer looks like: 
<details>
  
```
"statuses": [
        {
            "created_at": "Fri Sep 27 07:33:59 +0000 2019",
            "id": 1177486529645596674,
            "id_str": "1177486529645596674",
            "full_text": "Madam Nazar’s location for today September 27 2019 #RedDeadOnline #RDO #RockstarGames #NazarFinder #p12x https://t.co/zKYF9EHSW3",
            "truncated": false,
            "display_text_range": [
                0,
                104
            ],
            "entities": {
                "hashtags": [
                    {
                        "text": "RedDeadOnline",
                        "indices": [
                            51,
                            65
                        ]
                    },
                    {
                        "text": "RDO",
                        "indices": [
                            66,
                            70
                        ]
                    },
                    {
                        "text": "RockstarGames",
                        "indices": [
                            71,
                            85
                        ]
                    },
                    {
                        "text": "NazarFinder",
                        "indices": [
                            86,
                            98
                        ]
                    },
                    {
                        "text": "p12x",
                        "indices": [
                            99,
                            104
                        ]
                    }
                ],
                "symbols": [],
                "user_mentions": [],
                "urls": [],
                "media": [
                    {
                        "id": 1177486523215671296,
                        "id_str": "1177486523215671296",
                        "indices": [
                            105,
                            128
                        ],
                        "media_url": "http://pbs.twimg.com/media/EFdFwRgUcAAVoA-.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/EFdFwRgUcAAVoA-.jpg",
                        "url": "https://t.co/zKYF9EHSW3",
                        "display_url": "pic.twitter.com/zKYF9EHSW3",
                        "expanded_url": "https://twitter.com/LukyVJ/status/1177486529645596674/photo/1",
                        "type": "photo",
                        "sizes": {
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "medium": {
                                "w": 1200,
                                "h": 697,
                                "resize": "fit"
                            },
                            "large": {
                                "w": 1249,
                                "h": 725,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 680,
                                "h": 395,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "extended_entities": {
                "media": [
                    {
                        "id": 1177486523215671296,
                        "id_str": "1177486523215671296",
                        "indices": [
                            105,
                            128
                        ],
                        "media_url": "http://pbs.twimg.com/media/EFdFwRgUcAAVoA-.jpg",
                        "media_url_https": "https://pbs.twimg.com/media/EFdFwRgUcAAVoA-.jpg",
                        "url": "https://t.co/zKYF9EHSW3",
                        "display_url": "pic.twitter.com/zKYF9EHSW3",
                        "expanded_url": "https://twitter.com/LukyVJ/status/1177486529645596674/photo/1",
                        "type": "photo",
                        "sizes": {
                            "thumb": {
                                "w": 150,
                                "h": 150,
                                "resize": "crop"
                            },
                            "medium": {
                                "w": 1200,
                                "h": 697,
                                "resize": "fit"
                            },
                            "large": {
                                "w": 1249,
                                "h": 725,
                                "resize": "fit"
                            },
                            "small": {
                                "w": 680,
                                "h": 395,
                                "resize": "fit"
                            }
                        }
                    }
                ]
            },
            "metadata": {
                "iso_language_code": "en",
                "result_type": "recent"
            },
            "source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "user": {
                "id": 123355349,
                "id_str": "123355349",
                "name": "𝐋𝐔𝐊𝐘 𝐕𝐉 👨‍💻❤️ 🄲🅂🅂",
                "screen_name": "LukyVJ",
                "location": "Paris, France",
                "description": "Design & code @Algolia - CSS, JavaScript enthusiast - @bullgit - tweets are my own — ꓃⍒ꋞቀꌤψꊰ⏃ꈎ https://t.co/8kMltwFe5Q - Support a creator: LUKYVJ",
                "url": null,
                "entities": {
                    "description": {
                        "urls": [
                            {
                                "url": "https://t.co/8kMltwFe5Q",
                                "expanded_url": "http://lucasbonomi.com",
                                "display_url": "lucasbonomi.com",
                                "indices": [
                                    95,
                                    118
                                ]
                            }
                        ]
                    }
                },
                "protected": false,
                "followers_count": 2220,
                "friends_count": 1762,
                "listed_count": 242,
                "created_at": "Mon Mar 15 20:52:59 +0000 2010",
                "favourites_count": 24052,
                "utc_offset": null,
                "time_zone": null,
                "geo_enabled": true,
                "verified": false,
                "statuses_count": 20557,
                "lang": null,
                "contributors_enabled": false,
                "is_translator": false,
                "is_translation_enabled": false,
                "profile_background_color": "022330",
                "profile_background_image_url": "http://abs.twimg.com/images/themes/theme15/bg.png",
                "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme15/bg.png",
                "profile_background_tile": true,
                "profile_image_url": "http://pbs.twimg.com/profile_images/1012788065369251840/9lAsSmla_normal.jpg",
                "profile_image_url_https": "https://pbs.twimg.com/profile_images/1012788065369251840/9lAsSmla_normal.jpg",
                "profile_banner_url": "https://pbs.twimg.com/profile_banners/123355349/1568129989",
                "profile_link_color": "000000",
                "profile_sidebar_border_color": "FFFFFF",
                "profile_sidebar_fill_color": "C0DFEC",
                "profile_text_color": "333333",
                "profile_use_background_image": true,
                "has_extended_profile": true,
                "default_profile": false,
                "default_profile_image": false,
                "following": null,
                "follow_request_sent": null,
                "notifications": null,
                "translator_type": "regular"
            },
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 0,
            "favorite_count": 1,
            "favorited": false,
            "retweeted": false,
            "possibly_sensitive": false,
            "lang": "en"
        },
]
  
```

</details>

### 2 - Display data
Once we got the tweet that interest us, we will only extract & use some of it's informations:

- Twitter account
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
- [ ] From the point defined right before. I'd like to display a calendar to explore her locations per day
- [ ] Drastically improve the mobile version 


## Available Scripts
- yarn start
- yarn build
- yarn test 
- yarn deploy




## Thank you for reading
