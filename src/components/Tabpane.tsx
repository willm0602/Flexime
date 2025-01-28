'use client';

import { ReactNode, SetStateAction, useState } from "react"
import { Dispatch } from "redux";
import { twMerge } from "tailwind-merge";

export interface Tab {
  text: string,
  content: ReactNode,
}

type TabpaneTabs = Record<string, Tab>;

type TabpaneBarProps = {
  tabs: TabpaneTabs,
  updateActiveTab: (slug: string | undefined) => void,
  activeTabSlug: string | undefined
}
function TabpaneBar(props: TabpaneBarProps) {
  const { tabs, updateActiveTab, activeTabSlug } = props;
  return <div role="tablist" className='tabs tabs-boxed'>
    {Object.entries(tabs).map(([slug, tab], idx) => {
      const isActive = (activeTabSlug == slug);
      const className = twMerge('tab', isActive ? 'tab-active' : undefined)
      return <button role='tab'
        className={className}
        key={`tab-${idx}`}
        onClick={() => { updateActiveTab(slug) }}
      >{tab.text}</button>
    })}
  </div>
}

type TabpaneProps = {
  tabs: TabpaneTabs,
  defaultActiveTabSlug?: string,
  className?: string,
}

export default function Tabpane(props: TabpaneProps) {
  const { tabs, defaultActiveTabSlug, className } = props;

  const [activeTabSlug, setActiveTabSlug] = useState<string | undefined>(defaultActiveTabSlug);
  const [activeTab, setActiveTab] = useState<Tab | undefined>();

  const updateActiveTab = (newTabSlug?: string) => {
    if (newTabSlug) {
      const newActiveTab = tabs[newTabSlug || ''];
      if (newActiveTab) {
        setActiveTabSlug(newTabSlug);
        setActiveTab(newActiveTab);
        return;
      }
    }
    const [newActiveTabSlug, newActiveTab] = Object.entries(tabs)[0];
    setActiveTabSlug(newActiveTabSlug);
    setActiveTab(newActiveTab);
  };

  if (tabs && !activeTab)
    updateActiveTab();

  return <div className={className}>
    <TabpaneBar updateActiveTab={updateActiveTab}
      activeTabSlug={activeTabSlug}
      tabs={tabs} />
    {activeTab?.content}
  </div>
}


