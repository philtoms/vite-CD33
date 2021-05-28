const marqueeData = {
  height: 'tall',
  slides: [
    {
      index: 0,
      heading: 'ANYONE ANYWHERE',
      subheading: 'CREATE YOUR OWN LEGACY',
      links: [
        {
          type: 'button',
          title: 'Pre-order now',
          content: { type: 'string', value: 'PRE-ORDER NOW' },
          href: '#'
        }
      ],
      backgroundVideoSet: {
        videoMobile: {
          src: 'https://cdn.2kgames.com/web/2kfoundations/2k-foundations-marquee-720x1280-handbrake.mp4'
        },
        videoDesktop: {
          src: 'https://cdn.2kgames.com/web/2kfoundations/2k-foundations-marquee-1920x1080-handbrake.mp4'
        }
      },
      contentVerticalAlignMobile: 'bottom',
      contentVerticalAlignDesktop: 'bottom'
    }
  ]
}

const whatsNewSection = {
  primaryBlock: {
    heading: "WHAT'S NEW IN 2K22",
    body: 'Lorem ipsum dolor sit amet, consectetur adip iscing elit. Etiam risus turpis, pharetra luretta vulputate ipsum sed, tempus iaculis metus. Pharetra quis malesuada velit, at fement lorem. ',
    links: [
      {
        type: 'button',
        href: '#',
        content: {
          type: 'string',
          value: 'LEARN MORE'
        }
      }
    ]
  }
}

const content = {
  marqueeData,
  whatsNewSection
}

export default content
