import { Font, Page, Text, View, StyleSheet, Document } from "@react-pdf/renderer";
import type { GeneratedResume, GeneratedResumeProps } from "@/lib/generatedResume";

// Register a font (e.g., Roboto)
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2",
});

const DefaultTemplate: GeneratedResume = (props: GeneratedResumeProps) => {
  const { resume } = props;
  console.log("Using default template");

  const styles = StyleSheet.create({
    page: {
      padding: 30,
    },
    section: {
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      fontFamily: "Roboto", // Specify the font family
    },
    content: {
      fontSize: 12,
      lineHeight: 1.6,
      fontFamily: "Roboto", // Specify the font family
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>React PDF Example</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.content}>
            This is an example of a PDF generated on the client side using the
            @react-pdf/renderer library.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DefaultTemplate;
