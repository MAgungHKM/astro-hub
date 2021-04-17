import React, {createContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const HomeContext = createContext();

export const HomeProvider = ({children}) => {
  const [articles, setArticles] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [reports, setReports] = useState([]);

  const pushArticles = data => setArticles(articles.concat(data));

  const pushBlogs = data => setBlogs(blogs.concat(data));

  const pushReports = data => setReports(reports.concat(data));

  return (
    <HomeContext.Provider
      value={{
        articles,
        blogs,
        reports,
        pushArticles,
        pushBlogs,
        pushReports,
        setArticles,
        setBlogs,
        setReports,
      }}>
      {children}
    </HomeContext.Provider>
  );
};
