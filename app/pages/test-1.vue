<template>
  <MpFlex
    backgroundColor="background.overlay"
    align="flex-end"
    justify="flex-end"
    position="fixed"
    top="0"
    left="0"
    right="0"
    bottom="0"
  >
    <MpFlex
      direction="column"
      backgroundColor="background.stage"
      borderWidth="1"
      borderColor="border.default"
      height="100%"
      width="100%"
      overflow="hidden"
      :class="
        css({
          boxShadow:
            '0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)'
        })
      "
    >
      <!-- Header -->
      <MpFlex
        backgroundColor="background.neutral"
        borderBottomWidth="1"
        borderColor="border.default"
        align="center"
        justify="space-between"
        gap="3"
        paddingLeft="4"
        paddingRight="3"
        paddingY="3"
      >
        <MpText size="label" weight="semiBold">Customer support</MpText>
        <MpButton
          aria-label="Close drawer"
          left-icon="close"
          variant="ghost"
          size="sm"
          @click="onCloseDrawer"
        />
      </MpFlex>

      <!-- Main Content -->
      <MpFlex flex="1" overflow="hidden" width="100%">
        <!-- Left Section -->
        <MpFlex
          direction="column"
          gap="6"
          maxWidth="700px"
          minWidth="500px"
          padding="6"
          overflow="auto"
        >
          <!-- Stats Card -->
          <MpFlex
            direction="column"
            gap="4"
            backgroundColor="background.neutral"
            borderWidth="1"
            borderColor="border.default"
            borderRadius="md"
            padding="4"
          >
            <!-- Card Header -->
            <MpFlex direction="column">
              <MpText size="h2" weight="semiBold">Customer support</MpText>
            </MpFlex>

            <!-- Stats -->
            <MpFlex direction="column" gap="2">
              <MpFlex direction="column" gap="1">
                <MpFlex align="center" gap="1">
                  <MpText size="label" color="text.secondary"
                    >Accuracy rate</MpText
                  >
                  <MpIcon name="info" size="sm" color="icon.secondary" />
                </MpFlex>

                <MpFlex align="center" gap="2">
                  <MpText size="h2" weight="semiBold">82%</MpText>
                  <MpBadge for="additionalInformation" type="completed"
                    >Ready</MpBadge
                  >
                </MpFlex>
              </MpFlex>

              <!-- Progress Bar -->
              <Pixel.div
                backgroundColor="background.neutral-pressed"
                height="8px"
                borderRadius="full"
                position="relative"
                overflow="hidden"
              >
                <Pixel.div
                  backgroundColor="icon.success"
                  height="100%"
                  :class="css({ width: '82%' })"
                  borderRadius="full"
                />
              </Pixel.div>
            </MpFlex>

            <!-- Information Banner -->
            <MpFlex
              backgroundColor="background.information"
              gap="3"
              padding="3"
              borderRadius="md"
            >
              <MpIcon name="chatbot" size="sm" />
              <MpFlex direction="column" gap="1" flex="1">
                <MpText size="label">
                  A common inquiry is about how to refund a product. Let's
                  enhance your knowledge resources on this topic.
                  <MpText as="span" color="text.link">Add knowledge</MpText>
                </MpText>
              </MpFlex>
            </MpFlex>
          </MpFlex>

          <!-- Table -->
          <MpFlex direction="column">
            <!-- Table Header -->
            <MpFlex
              backgroundColor="background.surface"
              borderBottomWidth="1"
              borderColor="border.default"
              align="center"
              justify="space-between"
              gap="2"
              paddingLeft="2"
              paddingRight="4"
              paddingY="4"
            >
              <MpText size="label" weight="semiBold">Question group</MpText>
              <MpIcon name="filter" size="sm" />
            </MpFlex>

            <!-- Table Rows -->
            <MpFlex
              v-for="(question, index) in questionGroups"
              :key="index"
              backgroundColor="background.neutral-selected"
              borderBottomWidth="1"
              borderColor="border.default"
              paddingLeft="2"
              paddingRight="4"
              paddingY="2"
              :class="css({ minHeight: '52px' })"
            >
              <MpButton
                variant="textLink"
                size="sm"
                :class="
                  css({ textAlign: 'left', justifyContent: 'flex-start' })
                "
                @click="onQuestionClick(question)"
              >
                {{ question }}
              </MpButton>
            </MpFlex>
          </MpFlex>
        </MpFlex>

        <!-- Right Section -->
        <MpFlex
          direction="column"
          gap="4"
          flex="1"
          minWidth="940px"
          padding="6"
          overflow="auto"
          :class="
            css({
              backgroundImage:
                'linear-gradient(159.47deg, var(--colors-background-brand) 0%, var(--colors-background-highlight) 100.81%)'
            })
          "
        >
          <!-- Header -->
          <MpFlex direction="column" gap="0.5">
            <MpText size="h2" weight="semiBold">Answer comparison</MpText>
            <MpText size="label" color="text.secondary">
              Explore the differences between AI and human agents in providing
              answers.
            </MpText>
          </MpFlex>

          <!-- Question Cards -->
          <MpFlex direction="column" gap="4" paddingBottom="10">
            <!-- Collapsed Question Card 1 -->
            <Pixel.button
              backgroundColor="background.neutral-hovered"
              borderRadius="lg"
              padding="4"
              :class="
                css({
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3',
                  width: '100%'
                })
              "
              @click="onToggleQuestion(0)"
            >
              <MpIcon name="help" size="sm" />
              <MpText flex="1" :class="css({ textAlign: 'left' })">
                Hai mau refund dong. Gimana caranya?
              </MpText>
              <MpText size="label" color="text.placeholder"
                >No review yet</MpText
              >
              <MpIcon name="chevrons-down" size="md" />
            </Pixel.button>

            <!-- Expanded Question Card -->
            <MpFlex
              direction="column"
              backgroundColor="background.neutral-hovered"
              borderRadius="lg"
              overflow="hidden"
              :class="
                css({
                  boxShadow:
                    '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)'
                })
              "
            >
              <!-- Question Header -->
              <Pixel.button
                padding="4"
                :class="
                  css({
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3',
                    width: '100%',
                    backgroundColor: 'transparent'
                  })
                "
                @click="onToggleQuestion(1)"
              >
                <MpIcon name="help" size="sm" />
                <MpText flex="1" :class="css({ textAlign: 'left' })">
                  Halo Kak! Mau tanya dong, kalau barangnya ternyata kurang
                  cocok, cara urus refund-nya gimana ya?
                </MpText>
                <MpIcon name="chevrons-up" size="md" />
              </Pixel.button>

              <!-- Answer Comparison -->
              <MpFlex
                backgroundColor="background.neutral"
                gap="4"
                padding="4"
                borderRadius="md"
              >
                <!-- Human Agent Column -->
                <MpFlex
                  direction="column"
                  flex="1"
                  :class="css({ paddingBottom: '12' })"
                >
                  <MpFlex
                    direction="column"
                    gap="4"
                    flex="1"
                    backgroundColor="background.neutral-hovered"
                    borderRadius="lg"
                  >
                    <MpFlex
                      direction="column"
                      gap="4"
                      flex="1"
                      backgroundColor="background.neutral"
                      borderWidth="1"
                      borderColor="border.default-subtle"
                      borderRadius="lg"
                      padding="4"
                    >
                      <!-- Agent Info -->
                      <MpFlex align="center" gap="3">
                        <Pixel.div
                          backgroundColor="background.neutral-hovered"
                          borderRadius="md"
                          :class="
                            css({
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: '32px',
                              height: '32px'
                            })
                          "
                        >
                          <MpIcon
                            name="employee"
                            :class="css({ width: '18px', height: '18px' })"
                          />
                        </Pixel.div>
                        <MpText size="label" weight="semiBold"
                          >Human agent</MpText
                        >
                      </MpFlex>

                      <!-- Response Text -->
                      <MpText
                        size="body"
                        :class="css({ maxHeight: '320px', overflow: 'hidden' })"
                      >
                        Untuk memulai, bisa tolong informasikan Nomor Pesanan
                        dan alasan spesifik mengapa produk tersebut tidak cocok?
                        Selain itu, pastikan barang masih dalam kondisi baru,
                        label belum dilepas, dan ada video unboxing-nya ya Kak.
                        Setelah Kakak mengirimkan nomor pesanannya, kami akan
                        segera membuatkan tiket pengembalian untuk Kakak. Kami
                        tunggu informasinya, ya Kak!
                      </MpText>
                    </MpFlex>

                    <!-- Response Time -->
                    <MpFlex
                      direction="column"
                      gap="0.5"
                      paddingX="4"
                      paddingY="3"
                    >
                      <MpText size="label" color="text.secondary"
                        >Response time</MpText
                      >
                      <MpText size="label" weight="semiBold"
                        >1.5 minutes</MpText
                      >
                    </MpFlex>
                  </MpFlex>
                </MpFlex>

                <!-- AI Agent Column -->
                <MpFlex direction="column" gap="4" flex="1">
                  <!-- AI Response -->
                  <MpFlex
                    direction="column"
                    gap="4"
                    backgroundColor="background.highlight"
                    borderWidth="2"
                    borderColor="border.selected-disabled"
                    borderRadius="lg"
                    padding="4"
                    overflow="hidden"
                  >
                    <!-- Agent Info -->
                    <MpFlex align="center" gap="3">
                      <Pixel.div
                        backgroundColor="background.neutral"
                        borderRadius="md"
                        :class="
                          css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px'
                          })
                        "
                      >
                        <MpIcon
                          name="chatbot"
                          :class="css({ width: '18px', height: '18px' })"
                        />
                      </Pixel.div>
                      <MpText size="label" weight="semiBold">AI agent</MpText>
                    </MpFlex>

                    <!-- Response Text -->
                    <MpText size="body">
                      Halo! Berikut cara mengajukan pengembalian dana: 1. Cek
                      Kebijakan: Pastikan produk dalam masa garansi 2-7 hari. 2.
                      Siapkan Bukti: Foto produk dan rekam video unboxing. 3.
                      Ajukan di Aplikasi: Masuk ke 'Pesanan Saya', pilih produk,
                      lalu klik 'Ajukan Pengembalian'. 4. Pilih Alasan: 'Berubah
                      Pikiran' atau 'Produk Tidak Sesuai'. 5. Kirim Balik: Kirim
                      barang setelah permohonan disetujui. Butuh bantuan
                      merumuskan alasan refund? Saya siap membantu!
                    </MpText>

                    <!-- Sources -->
                    <MpFlex direction="column" gap="2">
                      <MpText size="label-small" color="text.secondary"
                        >Sources:</MpText
                      >

                      <MpFlex gap="2" wrap="wrap">
                        <MpFlex
                          v-for="(source, idx) in sources"
                          :key="idx"
                          backgroundColor="background.disabled"
                          borderRadius="sm"
                          gap="1.5"
                          paddingX="2"
                          paddingY="1.5"
                          :class="css({ maxWidth: '200px' })"
                        >
                          <MpIcon :name="source.icon as any" size="sm" />
                          <MpText
                            size="label-small"
                            :class="
                              css({
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              })
                            "
                          >
                            {{ source.label }}
                          </MpText>
                        </MpFlex>

                        <MpButton variant="textLink" size="sm"
                          >& 5 more</MpButton
                        >
                      </MpFlex>
                    </MpFlex>
                  </MpFlex>

                  <!-- Metrics -->
                  <MpFlex
                    gap="4"
                    paddingX="4"
                    paddingY="3"
                    backgroundColor="chart.cat03-bold"
                    borderRadius="lg"
                  >
                    <MpFlex direction="column" gap="0.5" flex="1">
                      <MpText size="label" color="text.inverse"
                        >Response time</MpText
                      >
                      <MpText
                        size="label"
                        weight="semiBold"
                        color="text.inverse"
                        >5.1 seconds</MpText
                      >
                    </MpFlex>

                    <Pixel.div
                      :class="
                        css({
                          width: '1px',
                          backgroundColor: 'background.neutral',
                          height: '100%'
                        })
                      "
                    />

                    <MpFlex direction="column" gap="0.5" flex="1">
                      <MpFlex align="center" gap="1">
                        <MpText size="label" color="text.inverse"
                          >Confidence</MpText
                        >
                        <MpIcon name="info" size="sm" color="icon.inverse" />
                      </MpFlex>
                      <MpText
                        size="label"
                        weight="semiBold"
                        color="text.inverse"
                        >80%</MpText
                      >
                    </MpFlex>

                    <Pixel.div
                      :class="
                        css({
                          width: '1px',
                          backgroundColor: 'background.neutral',
                          height: '100%'
                        })
                      "
                    />

                    <MpFlex direction="column" gap="0.5" flex="1">
                      <MpFlex align="center" gap="1">
                        <MpText size="label" color="text.inverse"
                          >Relevance</MpText
                        >
                        <MpIcon name="info" size="sm" color="icon.inverse" />
                      </MpFlex>
                      <MpText
                        size="label"
                        weight="semiBold"
                        color="text.inverse"
                        >90%</MpText
                      >
                    </MpFlex>
                  </MpFlex>

                  <!-- Feedback -->
                  <MpFlex align="center" gap="3">
                    <MpText flex="1" size="label">
                      Was this response good and accurate?
                    </MpText>
                    <MpFlex gap="2">
                      <Pixel.button
                        backgroundColor="background.neutral-subtle"
                        borderRadius="md"
                        padding="2"
                        :class="
                          css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          })
                        "
                        @click="onFeedback('up')"
                      >
                        <MpIcon name="like" size="sm" />
                      </Pixel.button>
                      <Pixel.button
                        backgroundColor="background.neutral-subtle"
                        borderRadius="md"
                        padding="2"
                        :class="
                          css({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          })
                        "
                        @click="onFeedback('down')"
                      >
                        <MpIcon name="dislike" size="sm" />
                      </Pixel.button>
                    </MpFlex>
                  </MpFlex>
                </MpFlex>
              </MpFlex>
            </MpFlex>

            <!-- More Collapsed Cards -->
            <Pixel.button
              v-for="(question, idx) in moreQuestions"
              :key="`more-${idx}`"
              backgroundColor="background.neutral-hovered"
              borderRadius="lg"
              padding="4"
              :class="
                css({
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3',
                  width: '100%'
                })
              "
              @click="onToggleQuestion(idx + 2)"
            >
              <MpIcon name="help" size="sm" />
              <MpText flex="1" :class="css({ textAlign: 'left' })">
                {{ question }}
              </MpText>
              <MpText size="label" color="text.placeholder"
                >No review yet</MpText
              >
              <MpIcon name="chevrons-down" size="md" />
            </Pixel.button>
          </MpFlex>
        </MpFlex>
      </MpFlex>

      <!-- Footer -->
      <MpFlex
        backgroundColor="background.stage"
        borderTopWidth="1"
        borderColor="border.default"
        align="center"
        justify="flex-end"
        gap="3"
        paddingX="4"
        paddingY="4"
      >
        <MpButton variant="ghost" @click="onCancel">Cancel</MpButton>
        <MpButton variant="secondary" @click="onEditAIAgent"
          >Edit AI agent</MpButton
        >
      </MpFlex>
    </MpFlex>
  </MpFlex>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  MpFlex,
  MpText,
  MpButton,
  MpBadge,
  MpIcon,
  Pixel,
  css,
  usePixelTheme
} from "@mekari/pixel3";

// Enable Design Token 2.4
const { setNextTheme } = usePixelTheme();
setNextTheme(true);

// Question groups data
const questionGroups = ref([
  "Cara refund produk",
  "Spesifikasi & harga produk",
  "Kualitas produk",
  "Ketersediaan stok",
  "Pengiriman barang",
  "Garansi produk",
  "Metode pembayaran",
  "Pengembalian produk",
  "Layanan pelanggan 24/7",
  "Ulasan produk",
  "Pembaruan status pengiriman",
  "Pengaturan akun pengguna",
  "Diskon & promo",
  "Saran produk",
  "Kebijakan privasi",
  "Bantuan teknis"
]);

const moreQuestions = ref([
  "Hai kak aku mau refund dan mengembalikan barang, gimana caranya ya?",
  "Saya ingin refund dan mengembalikan barang. Bagaimana caranya?",
  "Saya ingin mengajukan refund untuk produk yang ingin saya kembalikan.",
  "Saya mau mengembalikan barang dan mengajukan refund. Mohon informasinya.",
  "Bagaimana prosedur refund jika barang dikembalikan? Ingin klaim refund karena ingin mengembalikan produk.",
  "Saya ingin refund dan mengembalikan barang. Bagaimana caranya?"
]);

const sources = ref([
  { icon: "file", label: "How to refund" },
  { icon: "img", label: "Cara refund" },
  { icon: "text", label: "Refund 2025" },
  { icon: "link", label: "Cara refund & return terbaru 2025" }
]);

// Event handlers
const onCloseDrawer = () => {
  console.log("Close drawer");
};

const onQuestionClick = (question: string) => {
  console.log("Question clicked:", question);
};

const onToggleQuestion = (index: number) => {
  console.log("Toggle question:", index);
};

const onFeedback = (type: "up" | "down") => {
  console.log("Feedback:", type);
};

const onCancel = () => {
  console.log("Cancel clicked");
};

const onEditAIAgent = () => {
  console.log("Edit AI agent clicked");
};
</script>
