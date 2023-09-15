import { Fragment } from "react";
import { Update, categories } from "../../data/changes/type";
import { Text } from "../../ui-components/atoms/Text";

export const UpdateItem: React.FC<{ update: Update }> = ({ update }) => (
  <div key={update.date}>
    <Text element="h2" size="large">
      Update:{" "}
      {new Date(update.date).toLocaleString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </Text>
    {categories
      .filter((c) => !!update.changes[c])
      .map((c) => (
        <Fragment key={c}>
          <Text element="h3">{c}</Text>
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
