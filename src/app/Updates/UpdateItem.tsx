import { Fragment } from "react";
import { Update, categories } from "../../data/changes/type";
import { Text } from "../../ui-components/atoms/Text";

export const UpdateItem: React.FC<{ update: Update }> = ({ update }) => {
  const date = new Date(update.date);

  return (
    <div key={update.date}>
      <Text element="h1" size="large">
        Update:{" "}
        {date.toLocaleString("en", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </Text>
      {categories
        .filter((c) => !!update.changes[c])
        .map((c) => (
          <Fragment key={c}>
            <Text element="h2">{c}</Text>
            <ul>
              {update.changes[c]?.map((item) => (
                <li key={item}>
                  <Text skipOutline color="black">
                    {item}
                  </Text>
                </li>
              ))}
            </ul>
          </Fragment>
        ))}
    </div>
  );
};
