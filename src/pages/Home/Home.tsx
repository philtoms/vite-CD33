import React from 'react'
import { BcMarquee } from '@2k-web/bc-marquee-react'
import { courtsideReports } from './courtsideReports.data'
import { BcFeaturedContentSection } from '@2k-web/bc-featured-content-section-react'
import { BcFeaturedTilesSection } from '@2k-web/bc-featured-tiles-section-react'
import { getContentFromContentful } from '../../contentfulLibrary'
import { Entry } from 'contentful'
import { IImgSrc, IPage, IPageHome } from '../../../@types/generated/contentful'
import { linkDto } from '../../dtos/link.dto'
import { featuredContentSectionDto } from '../../dtos/featuredContentSection.dto'
import { getPageComponents } from '../../getPageComponents'
import homePageContent from './home.content'

type HomeProps = {
  // marqueeData: any
  // whatsNewSection: any
}

const flattenContentEntry = (entryOrEntries: Entry<any>) => {}
export const Home: React.FC<HomeProps> = () => {
  const { whatsNewSection, marqueeData } = homePageContent
  if (!whatsNewSection || !marqueeData) return null

  return (
    <div>
      <BcMarquee {...marqueeData} />
      {/*Editions section here*/}
      <BcFeaturedContentSection {...whatsNewSection} />
      <BcFeaturedTilesSection {...courtsideReports} />
    </div>
  )
}
