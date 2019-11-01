const ability_cards = [
  {
    name: "Dead eye",
    cards: [
      {
        name: "A Moment to Recuperate",
        description:
          "While Dead Eye is active you regenerate health. Taking any damage will cancel Dead Eye. (TIER I: Free)",
        type: "dead_eye"
      },
      {
        name: "Focus Fire",
        description:
          "While Dead Eye is active you and your team members deal more damage. If more than one member of your team has this ability active, the effects do not stack. (TIER I: $50)",

        type: "dead_eye"
      },
      {
        name: "Paint it Black",
        description:
          "While Dead Eye is active you can paint targets onto enemies. Fire your weapon to shoot all marked targets. Each shot drains Dead Eye. (TIER I: $50)",

        type: "dead_eye"
      },
      {
        name: "Slow and Steady",
        description:
          "While Dead Eye is active you take less damage and headshots do not kill you outright. You cannot run or sprint.",
        unlock: 24,
        type: "dead_eye"
      },
      {
        name: "Quite an Inspiration",
        description:
          "While Dead Eye is active you and your allies regenerate health. If more than one member of your team has this ability active, the effects do not stack.",
        unlock: 44,
        type: "dead_eye"
      },
      {
        name: "Slippery Bastard",
        description:
          "While Dead Eye is active enemy players cannot lock onto you, and you cannot lock onto them. Other enemies are less accurate when shooting at you. The rate at which your Dead Eye drains is dramatically increased.",
        unlock: 50,
        type: "dead_eye"
      }
    ]
  },
  {
    name: "Combat",
    cards: [
      {
        name: "Horseman",
        description: "You deal a little more damage while on horseback.",
        unlock: 10,
        type: "combat"
      },
      {
        name: "Necessity Breeds",
        description:
          "As you get closer to death, you start to do a little more damage.",
        unlock: 16,
        type: "combat"
      },
      {
        name: "Landon’s Patience",
        description:
          "Waiting for up to 15 seconds between shots slightly increases your damage",
        unlock: 18,
        type: "combat"
      },
      {
        name: "The Short Game",
        description:
          "You deal more damage to targets closer to you, but less to far away targets.",
        unlock: 38,
        type: "combat"
      },
      {
        name: "Hangman",
        description:
          "Lasso chokes enemies dealing damage for every second they are lassoed.",
        unlock: 42,
        type: "combat"
      },
      {
        name: "Winning Streak",
        description:
          "Each consecutive shot on the same target does a little more damage.",
        unlock: 48,
        type: "combat"
      },
      {
        name: "Gunslinger’s Choice",
        description:
          "While dual-wielding, you deal more damage and are more accurate",
        type: "combat"
      },
      {
        name: "Sharpshooter",
        description:
          "While using a scope, you deal more damage and take less damage",
        type: "combat"
      }
    ]
  },
  {
    name: "Recovery",
    cards: [
      {
        name: "Come Back Stronger",
        description:
          "Health begins regenerating a little sooner after you take damage.",
        unlock: 10,
        type: "recovery"
      },
      {
        name: "Peak Condition",
        description:
          "You inflict a little more damage if your Stamina is at least 75% full.",
        unlock: 14,
        type: "recovery"
      },
      {
        name: "Eye for an Eye",
        description: "Headshots restore a little Dead Eye.",
        unlock: 28,
        type: "recovery"
      },
      {
        name: "The Gift of Focus",
        description:
          "Items and Abilities which restore Dead Eye have their effects slightly improved. You deal a little less damage.",
        unlock: 30,
        type: "recovery"
      },
      {
        name: "Strange Medicine",
        description:
          "You regain a little health whenever you inflict damage. Your health will otherwise regenerate at half the normal rate.",
        unlock: 32,
        type: "recovery"
      },
      {
        name: "Cold Blooded",
        description:
          "After killing an enemy you will get back a little health over the next five seconds.",
        unlock: 36,
        type: "recovery"
      },
      {
        name: "Kick in the Butt",
        description:
          "Whenever you take damage, a proportion of it is added to your Dead Eye",
        type: "recovery"
      },
      {
        name: "Live for the Fight",
        description: "You regenerate Dead Eye slowly over time",
        type: "recovery"
      },
      {
        name: "Iron Lung",
        description:
          "Your Stamina regenerates faster, and you take less damage depending on your current Stamina level",
        type: "recovery"
      },
      {
        name: "Ride Like the Wind",
        description:
          "Whenever you take or deal damage while mounted, a proportion of it is added to your horse's Health and Stamina",
        type: "recovery"
      }
    ]
  },
  {
    name: "Defense",
    cards: [
      {
        name: "Hunker Down",
        description: "Take less damage while in cover.",
        unlock: 20,
        type: "defense"
      },

      {
        name: "To Fight Another Day",
        description: "Take less damage from bullets while sprinting.",
        unlock: 22,
        type: "defense"
      },

      {
        name: "The Unblinking Eye",
        description: "Dead Eye and Eagle Eye drain slower.",
        unlock: 26,
        type: "defense"
      },

      {
        name: "Take the Pain Away",
        description:
          "Reviving someone gives you and that person less damage taken for 8 seconds.",
        unlock: 34,
        type: "defense"
      },

      {
        name: "Of Single Purpose",
        description:
          "Take less damage from bullets while unarmed or using a melee weapon.",
        unlock: 40,
        type: "defense"
      },

      {
        name: "Never without One",
        description:
          "Your hat will block one headshot and then fall off. If you are not wearing a hat you take more damage.",
        unlock: 46,
        type: "defense"
      },

      {
        name: "Strength in Numbers",
        description:
          "You take less damage for every nearby ally, up to a maximum of three allies",
        type: "defense"
      },

      {
        name: "Fool Me Once",
        description:
          "You take less damage each consecutive time you are shot. This effect ends if you are not shot for 10 seconds",
        type: "defense"
      },

      {
        name: "Friends for Life",
        description: "While mounted, you and your horse take less damage",
        type: "defense"
      }
    ]
  }
];

export default ability_cards;
