import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', color: '#000' },
  header: { marginBottom: 20, textAlign: 'center' },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  contact: { fontSize: 10, color: '#333' },
  section: { marginBottom: 15 },
  sectionTitle: { 
    fontSize: 12, 
    fontWeight: 'bold', 
    borderBottom: '1pt solid #000', 
    paddingBottom: 2, 
    marginBottom: 8, 
    textTransform: 'uppercase' 
  },
  text: { fontSize: 10, lineHeight: 1.5 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  jobTitle: { fontSize: 11, fontWeight: 'bold' },
  jobDate: { fontSize: 10, fontStyle: 'italic' },
  bulletContainer: { flexDirection: 'row', marginBottom: 3 },
  bulletPoint: { width: 15, fontSize: 10 },
  bulletText: { flex: 1, fontSize: 10, lineHeight: 1.5 },
  skills: { fontSize: 10, lineHeight: 1.5 },
  
  // New Education Styles
  eduHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  eduDegree: { fontSize: 11, fontWeight: 'bold' },
  eduSchool: { fontSize: 10, fontStyle: 'italic' }
});

const ResumePDF = ({ data }) => {
  // Format contact info cleanly to avoid trailing pipes if GitHub is empty
  const contactInfo = [
    data.personal_info?.email,
    data.personal_info?.phone,
    data.personal_info?.linkedin,
    data.personal_info?.github
  ].filter(Boolean).join(' | ');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header Info */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personal_info?.name || "Your Name"}</Text>
          <Text style={styles.contact}>{contactInfo}</Text>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>

        {/* Education (NEW) */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <View style={styles.eduHeader}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.jobDate}>{edu.graduationDate}</Text>
                </View>
                <Text style={styles.eduSchool}>{edu.school}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <Text style={styles.skills}>{data.skills?.join(', ')}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experience?.map((exp, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{exp.role} at {exp.company}</Text>
                <Text style={styles.jobDate}>{exp.duration}</Text>
              </View>
              {exp.achievements?.map((bullet, i) => (
                <View key={i} style={styles.bulletContainer}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

      </Page>
    </Document>
  );
};

export default ResumePDF;